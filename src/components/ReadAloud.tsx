import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

/*
  Reads the page's commentary aloud with the device's own natural voices (Web Speech API),
  the same approach as the Klesia Bible audio. The chosen voice and speed are remembered.
*/

const VOICE_KEY = 'readAloud.voice'
const RATE_KEY = 'readAloud.rate'
const RATE_MIN = 0.8
const RATE_MAX = 1.25

// Sections that are not narrative: verse lists, reading lists, word boxes, navigation, quiz buttons.
const SKIP = '.verse-list, .res-list, .pager, .terms, .quiz-opts, .search, .step-controls, [data-noread]'
const BLOCKS = 'h1, .lede, h2, h3, p, dt, dd, li, .pullquote blockquote, .pullquote figcaption'

const store = {
  get(k: string) {
    try {
      return localStorage.getItem(k)
    } catch {
      return null
    }
  },
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v)
    } catch {
      /* storage unavailable */
    }
  },
}

function isNatural(v: SpeechSynthesisVoice) {
  return /natural|neural|online|enhanced|premium|google/i.test(v.name)
}

function rankVoices(all: SpeechSynthesisVoice[]) {
  const en = all.filter((v) => v.lang.toLowerCase().startsWith('en'))
  const natural = en.filter(isNatural)
  const list = natural.length ? natural : en
  return [...list].sort((a, b) => Number(b.lang === 'en-US') - Number(a.lang === 'en-US') || a.name.localeCompare(b.name))
}

function friendly(v: SpeechSynthesisVoice) {
  return v.name.replace(/^Microsoft\s+/i, '').replace(/\s*Online\s*\(Natural\)/i, '').replace(/\s*\(Natural\)/i, '').trim()
}

function collectBlocks(): HTMLElement[] {
  const root = document.querySelector('.commentary')
  if (!root) return []
  const picked: HTMLElement[] = []
  root.querySelectorAll<HTMLElement>(BLOCKS).forEach((el) => {
    if (el.closest(SKIP)) return
    // Skip headings of sections that are not read (Key words, Scripture, Further reading).
    if (/^H[23]$/.test(el.tagName) && el.nextElementSibling?.matches(SKIP)) return
    if (picked.some((p) => p.contains(el))) return
    if (!el.innerText.trim()) return
    picked.push(el)
  })
  return picked
}

// Split long text so browsers don't cut speech off mid-paragraph.
function chunks(text: string) {
  const sentences = text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?"”')]*\s*/g) ?? [text]
  const out: string[] = []
  let cur = ''
  for (const s of sentences) {
    if ((cur + s).length > 220 && cur) {
      out.push(cur.trim())
      cur = ''
    }
    cur += s
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

export default function ReadAloud() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [voiceName, setVoiceName] = useState<string>(() => store.get(VOICE_KEY) ?? '')
  const [rate, setRate] = useState<number>(() => {
    const r = Number(store.get(RATE_KEY))
    return r >= RATE_MIN && r <= RATE_MAX ? r : 1
  })
  const [state, setState] = useState<'idle' | 'playing' | 'paused'>('idle')
  const run = useRef(0)
  const current = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!supported) return
    const load = () => setVoices(rankVoices(window.speechSynthesis.getVoices()))
    load()
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load)
  }, [supported])

  const voice = voices.find((v) => v.name === voiceName) ?? voices[0]

  const mark = (el: HTMLElement | null) => {
    current.current?.classList.remove('reading-now')
    current.current = el
    if (el) {
      el.classList.add('reading-now')
      el.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' })
    }
  }

  const stop = useCallback(() => {
    run.current++
    if (supported) window.speechSynthesis.cancel()
    current.current?.classList.remove('reading-now')
    current.current = null
    setState('idle')
  }, [supported])

  // Stop when the page changes.
  useEffect(() => stop, [pathname, stop])

  const play = () => {
    if (!supported) return
    if (state === 'paused') {
      window.speechSynthesis.resume()
      setState('playing')
      return
    }
    stop()
    const id = ++run.current
    const blocks = collectBlocks()
    const queue: { el: HTMLElement; text: string }[] = []
    blocks.forEach((el) => chunks(el.innerText).forEach((text) => queue.push({ el, text })))
    let i = 0
    const next = () => {
      if (id !== run.current) return
      if (i >= queue.length) {
        mark(null)
        setState('idle')
        return
      }
      const item = queue[i++]
      if (current.current !== item.el) mark(item.el)
      const u = new SpeechSynthesisUtterance(item.text)
      if (voice) {
        u.voice = voice
        u.lang = voice.lang
      }
      u.rate = rate
      u.onend = next
      u.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') next()
      }
      window.speechSynthesis.speak(u)
    }
    setState('playing')
    next()
  }

  const pause = () => {
    window.speechSynthesis.pause()
    setState('paused')
  }

  const chooseVoice = (name: string) => {
    setVoiceName(name)
    store.set(VOICE_KEY, name)
    if (state !== 'idle') stop()
  }

  const chooseRate = (r: number) => {
    setRate(r)
    store.set(RATE_KEY, String(r))
    if (state !== 'idle') stop()
  }

  if (!supported) return null

  return (
    <div className="ra" data-noread>
      <AnimatePresence>
        {open && (
          <motion.div
            className="ra-panel"
            initial={{ opacity: 0, y: reduce ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 8 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            role="dialog"
            aria-label="Read aloud"
          >
            <div className="ra-row">
              {state === 'playing' ? (
                <button className="btn" onClick={pause}>Pause</button>
              ) : (
                <button className="btn" onClick={play}>{state === 'paused' ? 'Resume' : 'Read this page'}</button>
              )}
              <button className="btn ghost" onClick={stop} disabled={state === 'idle'}>Stop</button>
            </div>
            <label className="ra-label" htmlFor="ra-voice">Voice</label>
            <select id="ra-voice" className="ra-select" value={voice?.name ?? ''} onChange={(e) => chooseVoice(e.target.value)}>
              {voices.length === 0 && <option value="">Loading voices…</option>}
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {friendly(v)} ({v.lang})
                </option>
              ))}
            </select>
            <label className="ra-label" htmlFor="ra-rate">
              Speed <span>{rate.toFixed(2)}×</span>
            </label>
            <input id="ra-rate" type="range" min={RATE_MIN} max={RATE_MAX} step={0.05} value={rate} onChange={(e) => chooseRate(Number(e.target.value))} />
          </motion.div>
        )}
      </AnimatePresence>
      <button className={`ra-fab${state !== 'idle' ? ' on' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Read aloud">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9v6h4l5 4V5L8 9H4z" />
          <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" />
        </svg>
        <span>{state === 'playing' ? 'Reading…' : state === 'paused' ? 'Paused' : 'Listen'}</span>
      </button>
    </div>
  )
}
