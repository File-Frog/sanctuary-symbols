import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'

// Natural (neural) voices offered on the site.
export const VOICES = {
  'en-US-AndrewNeural': 'Andrew (male)',
  'en-US-BrianNeural': 'Brian (male)',
  'en-US-ChristopherNeural': 'Christopher (male)',
  'en-US-EmmaNeural': 'Emma (female)',
  'en-US-AvaNeural': 'Ava (female)',
  'en-US-JennyNeural': 'Jenny (female)',
}

const cache = new Map()
const MAX_CACHE = 400

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const timings = []

async function synthOnce(text, voice, rate, t) {
  const tts = new MsEdgeTTS({ enableLogger: process.env.TTS_DEBUG === '1' })
  try {
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
    const pct = Math.round((rate - 1) * 100)
    const { audioStream } = tts.toStream(esc(text), { rate: `${pct >= 0 ? '+' : ''}${pct}%` })
    const parts = []
    for await (const chunk of audioStream) {
      if (!t.first) t.first = Date.now() - t.t0
      parts.push(chunk)
    }
    const buf = Buffer.concat(parts)
    if (!buf.length) throw new Error('empty audio')
    return buf
  } finally {
    tts.close()
  }
}

async function synth(text, voice, rate) {
  const t = { len: text.length, t0: Date.now() }
  try {
    try {
      return await synthOnce(text, voice, rate, t)
    } catch {
      t.retry = true
      return await synthOnce(text, voice, rate, t)
    }
  } finally {
    t.end = Date.now() - t.t0
    delete t.t0
    timings.push(t)
    if (timings.length > 30) timings.shift()
  }
}

// Audio is kept on the volume (when one is mounted) so it survives restarts and deploys.
const DIR = process.env.TTS_CACHE_DIR || (process.env.RAILWAY_VOLUME_MOUNT_PATH ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, 'tts') : '')
if (DIR) fs.mkdir(DIR, { recursive: true }).catch((e) => console.error('tts cache dir', e.message))

function remember(key, audio) {
  cache.set(key, audio)
  if (cache.size > MAX_CACHE) cache.delete(cache.keys().next().value)
}

async function fromDisk(key) {
  if (!DIR) return null
  try {
    const buf = await fs.readFile(path.join(DIR, `${key}.mp3`))
    return buf.length ? buf : null
  } catch {
    return null
  }
}

async function toDisk(key, audio) {
  if (!DIR) return
  const file = path.join(DIR, `${key}.mp3`)
  try {
    await fs.writeFile(`${file}.tmp`, audio)
    await fs.rename(`${file}.tmp`, file)
  } catch (e) {
    console.error('tts cache write', e.message)
  }
}

// One shared work queue so the voice service is never asked for more than two parts at once.
// Parts someone is waiting to hear go ahead of parts being prepared in the background.
const LIMIT = 2
const urgent = []
const background = []
const pending = new Map()
let active = 0

function pump() {
  while (active < LIMIT && (urgent.length || background.length)) {
    const w = urgent.length ? urgent.shift() : background.shift()
    active++
    w.job()
      .then(w.resolve, w.reject)
      .finally(() => {
        active--
        pump()
      })
  }
}

function schedule(key, job, isUrgent) {
  const known = pending.get(key)
  if (known) {
    if (isUrgent) {
      const i = background.findIndex((w) => w.key === key)
      if (i >= 0) urgent.push(...background.splice(i, 1))
    }
    return known
  }
  if (!isUrgent && background.length > 2000) return Promise.resolve(null)
  let item
  const p = new Promise((resolve, reject) => {
    item = { key, job, resolve, reject }
  })
  ;(isUrgent ? urgent : background).push(item)
  pending.set(key, p)
  p.catch(() => {}).finally(() => pending.delete(key))
  pump()
  return p
}

function request(body) {
  const text = String(body?.text ?? '').trim().slice(0, 1200)
  const voice = VOICES[body?.voice] ? body.voice : 'en-US-AndrewNeural'
  const rate = Math.min(1.25, Math.max(0.8, Number(body?.rate) || 1))
  const key = createHash('sha1').update(`${voice}|${rate}|${text}`).digest('hex')
  // The voice service needs a sentence ending; headings and labels often have none.
  const spoken = /[.!?:;]["'”’)]*$/.test(text) ? text : `${text}.`
  return { text, voice, rate, key, spoken }
}

async function getAudio({ key, spoken, voice, rate }, isUrgent) {
  const hit = cache.get(key)
  if (hit) return hit
  return schedule(
    key,
    async () => {
      let audio = await fromDisk(key)
      if (!audio) {
        audio = await synth(spoken, voice, rate)
        toDisk(key, audio)
      }
      remember(key, audio)
      return audio
    },
    isUrgent,
  )
}

export function ttsRoutes(app, express) {
  app.get('/api/tts/timings', (_req, res) => res.json({ disk: Boolean(DIR), active, urgent: urgent.length, background: background.length, timings }))
  app.get('/api/tts/voices', (_req, res) => res.json(Object.entries(VOICES).map(([id, label]) => ({ id, label }))))

  // Prepare a whole page in the background as soon as someone opens Listen.
  app.post('/api/tts/prepare', express.json({ limit: '256kb' }), (req, res) => {
    const texts = Array.isArray(req.body?.texts) ? req.body.texts.slice(0, 400) : []
    let queued = 0
    for (const text of texts) {
      const r = request({ text, voice: req.body?.voice, rate: req.body?.rate })
      if (!r.text || cache.has(r.key)) continue
      getAudio(r, false).catch(() => {})
      queued++
    }
    res.json({ queued })
  })

  app.post('/api/tts', express.json({ limit: '8kb' }), async (req, res) => {
    const r = request(req.body)
    if (!r.text) return res.status(400).json({ error: 'No text to read.' })
    try {
      const audio = await getAudio(r, true)
      if (!audio) throw new Error('busy')
      res.set({ 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=86400' })
      res.send(audio)
    } catch (e) {
      console.error('tts failed', e?.message ?? e)
      res.status(502).json({ error: 'The voice service did not respond. Try again in a moment.' })
    }
  })
}
