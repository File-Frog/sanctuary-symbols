import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Stage from '../components/Stage'
import { allReferences, gatewayUrl, verseText } from '../components/Scripture'
import { Pager } from '../components/Bits'
import { BOOKS, bookIndex } from '../data/books'
import { buildUsage } from '../data/index'

const FEATURED = ['Psalm 77:13', 'Exodus 25:8-9', 'Hebrews 8:1-2', 'John 1:29', 'Hebrews 4:16', 'Daniel 8:14', 'Revelation 14:7', 'Hebrews 7:25', 'Romans 3:25-26']

function sortKey(ref: string) {
  const m = ref.match(/(\d+):(\d+)/)!
  return bookIndex(ref) * 1e6 + Number(m[1]) * 1000 + Number(m[2])
}

export default function Scripture() {
  const reduce = useReducedMotion()
  const usage = useMemo(buildUsage, [])
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setI((x) => (x + 1) % FEATURED.length), 9000)
    return () => window.clearInterval(t)
  }, [reduce])

  const refs = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return allReferences()
      .filter((r) => !needle || r.toLowerCase().includes(needle) || verseText(r)?.some((v) => v.t.toLowerCase().includes(needle)))
      .sort((a, b) => sortKey(a) - sortKey(b))
  }, [q])

  const groups = useMemo(() => {
    const g = new Map<string, string[]>()
    for (const r of refs) {
      const book = BOOKS[bookIndex(r)]
      g.set(book, [...(g.get(book) ?? []), r])
    }
    return [...g.entries()]
  }, [refs])

  const featured = FEATURED[i]
  const ft = verseText(featured)

  return (
    <>
      <Stage caption={`${allReferences().length} passages quoted in this study`}>
        <div className="featured-verse">
          <AnimatePresence mode="wait">
            <motion.blockquote key={featured} initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -10 }} transition={{ duration: reduce ? 0 : 0.7 }}>
              <p>{ft?.map((v) => v.t).join(' ')}</p>
              <cite>{featured}</cite>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </Stage>

      <div className="commentary">
        <div className="prose">
          <h1>Scripture Index</h1>
          <p className="lede">Every passage used in this study, in canonical order, with the pages that use it.</p>
          <label htmlFor="vsearch" style={{ display: 'block', fontSize: '0.92rem', color: 'var(--ink-soft)', marginBottom: 6 }}>
            Search by reference or by a word in the verse
          </label>
          <input id="vsearch" className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “mercy seat”, “Hebrews 9” or “blood”" />
          <p style={{ marginTop: 10, fontSize: '0.9rem', color: 'var(--ink-soft)' }}>{refs.length} passages</p>
        </div>

        {groups.length === 0 && <p>No passages match “{q}”. Try a shorter word or a book name.</p>}

        {groups.map(([book, list]) => (
          <section key={book}>
            <h2 className="book-head">{book === 'Psalm' ? 'Psalms' : book}</h2>
            <ul className="verse-list">
              {list.map((r) => {
                const t = verseText(r)
                return (
                  <li key={r}>
                    <div className="vl-head">
                      <a className="vl-ref" href={gatewayUrl(r)} target="_blank" rel="noreferrer">{r}</a>
                      <span className="vl-note">
                        {usage.get(r)?.map((u, k) => (
                          <Fragment key={u.path}>
                            {k > 0 && ', '}
                            <Link to={u.path}>{u.title}</Link>
                          </Fragment>
                        ))}
                      </span>
                    </div>
                    <blockquote>
                      {t?.map((v) => (
                        <Fragment key={v.v}>
                          {t.length > 1 && <sup>{v.v}</sup>}
                          {v.t}{' '}
                        </Fragment>
                      ))}
                    </blockquote>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}

        <Pager path="/sanctuary/scripture" />
      </div>
    </>
  )
}
