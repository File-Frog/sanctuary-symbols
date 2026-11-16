import { createHash } from 'node:crypto'
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

async function synth(text, voice, rate) {
  const tts = new MsEdgeTTS()
  try {
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
    const pct = Math.round((rate - 1) * 100)
    const { audioStream } = tts.toStream(esc(text), { rate: `${pct >= 0 ? '+' : ''}${pct}%` })
    const parts = []
    for await (const chunk of audioStream) parts.push(chunk)
    return Buffer.concat(parts)
  } finally {
    tts.close()
  }
}

export function ttsRoutes(app, express) {
  app.get('/api/tts/voices', (_req, res) => res.json(Object.entries(VOICES).map(([id, label]) => ({ id, label }))))

  app.post('/api/tts', express.json({ limit: '8kb' }), async (req, res) => {
    const text = String(req.body?.text ?? '').trim().slice(0, 1200)
    const voice = VOICES[req.body?.voice] ? req.body.voice : 'en-US-AndrewNeural'
    const rate = Math.min(1.25, Math.max(0.8, Number(req.body?.rate) || 1))
    if (!text) return res.status(400).json({ error: 'No text to read.' })
    const key = createHash('sha1').update(`${voice}|${rate}|${text}`).digest('hex')
    // The voice service needs a sentence ending; headings and labels often have none.
    const spoken = /[.!?:;]["'”’)]*$/.test(text) ? text : `${text}.`
    try {
      let audio = cache.get(key)
      if (!audio) {
        try {
          audio = await synth(spoken, voice, rate)
        } catch {
          audio = await synth(spoken, voice, rate) // one retry
        }
        if (!audio.length) throw new Error('empty audio')
        cache.set(key, audio)
        if (cache.size > MAX_CACHE) cache.delete(cache.keys().next().value)
      }
      res.set({ 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=86400' })
      res.send(audio)
    } catch (e) {
      console.error('tts failed', e?.message ?? e)
      res.status(502).json({ error: 'The voice service did not respond. Try again in a moment.' })
    }
  })
}
