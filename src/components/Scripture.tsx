import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import versesJson from '../data/verses.json'
import { refRegex } from '../data/books'
import type { Verse } from '../data/symbols'

type VerseText = { v: number; t: string }
const VERSES = versesJson as Record<string, VerseText[]>

export function gatewayUrl(ref: string) {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=KJV`
}

export function verseText(ref: string) {
  return VERSES[ref]
}

let openCloser: (() => void) | null = null

export function VerseRef({ refText, children }: { refText: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const anchor = useRef<HTMLButtonElement>(null)
  const pop = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const text = VERSES[refText]

  const close = useCallback(() => setOpen(false), [])

  const show = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      if (openCloser && openCloser !== close) openCloser()
      openCloser = close
      setOpen(true)
    }, 90)
  }
  const hide = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(false), 180)
  }

  useLayoutEffect(() => {
    if (!open || !anchor.current || !pop.current) return
    const a = anchor.current.getBoundingClientRect()
    const p = pop.current.getBoundingClientRect()
    const margin = 12
    let left = a.left + a.width / 2 - p.width / 2
    left = Math.max(margin, Math.min(left, window.innerWidth - p.width - margin))
    let top = a.bottom + 10
    if (top + p.height > window.innerHeight - margin) top = Math.max(margin, a.top - p.height - 10)
    setPos({ top, left })
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onScroll = () => setOpen(false)
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!anchor.current?.contains(t) && !pop.current?.contains(t)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  if (!text) return <>{children ?? refText}</>

  return (
    <>
      <button
        ref={anchor}
        type="button"
        className="vref"
        aria-expanded={open}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={() => {
          if (openCloser && openCloser !== close) openCloser()
          openCloser = close
          setOpen((o) => !o)
        }}
      >
        {children ?? refText}
      </button>
      {open &&
        createPortal(
          <div
            ref={pop}
            role="tooltip"
            className="vpop"
            style={{ top: pos?.top ?? -9999, left: pos?.left ?? -9999 }}
            onMouseEnter={() => window.clearTimeout(timer.current)}
            onMouseLeave={hide}
          >
            <div className="vpop-ref">{refText}</div>
            <p className="vpop-text">
              {text.map((v) => (
                <Fragment key={v.v}>
                  {text.length > 1 && <sup>{v.v}</sup>}
                  {v.t}{' '}
                </Fragment>
              ))}
            </p>
            <div className="vpop-foot">
              <span>KJV</span>
              <a href={gatewayUrl(refText)} target="_blank" rel="noreferrer">
                Read the chapter
              </a>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

type InlineTerm = { translit: string; meaning: string; lang: string }

function withTerms(text: string, terms: InlineTerm[] | undefined, keyBase: number): React.ReactNode[] {
  if (!terms?.length) return [text]
  const esc = terms.map((t) => t.translit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).sort((a, b) => b.length - a.length)
  const re = new RegExp(`(?<![\\w'])(${esc.join('|')})(?![\\w'])`, 'g')
  const out: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0
    if (i > last) out.push(text.slice(last, i))
    const t = terms.find((x) => x.translit === m[0])!
    out.push(
      <em key={`${keyBase}-${i}`} className="term-inline" title={`${t.lang}: ${t.meaning}`}>
        {m[0]}
      </em>,
    )
    last = i + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

/** Renders text, turning every scripture reference into a hover popover. */
export function Rich({ text, terms }: { text: string; terms?: InlineTerm[] }) {
  const out: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(refRegex())) {
    const i = m.index ?? 0
    let before = text.slice(last, i)
    const lead = before.endsWith('(') ? '(' : ''
    if (lead) before = before.slice(0, -1)
    if (before) out.push(...withTerms(before, terms, i))
    const end = i + m[0].length
    const tail = text.slice(end).match(/^[).,;:]+/)?.[0] ?? ''
    out.push(
      <span key={i} style={{ whiteSpace: 'nowrap' }}>
        {lead}
        <VerseRef refText={m[0]} />
        {tail}
      </span>,
    )
    last = end + tail.length
  }
  if (last < text.length) out.push(...withTerms(text.slice(last), terms, -1))
  return <>{out}</>
}

export function VerseList({ verses }: { verses: Verse[] }) {
  return (
    <ul className="verse-list">
      {verses.map((v) => {
        const t = VERSES[v.ref]
        return (
          <li key={v.ref}>
            <div className="vl-head">
              <a className="vl-ref" href={gatewayUrl(v.ref)} target="_blank" rel="noreferrer">
                {v.ref}
              </a>
              {v.note && <span className="vl-note">{v.note}</span>}
            </div>
            {t && (
              <blockquote>
                {t.map((x) => (
                  <Fragment key={x.v}>
                    {t.length > 1 && <sup>{x.v}</sup>}
                    {x.t}{' '}
                  </Fragment>
                ))}
              </blockquote>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function allReferences() {
  return Object.keys(VERSES)
}
