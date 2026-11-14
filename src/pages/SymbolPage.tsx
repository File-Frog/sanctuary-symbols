import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Plan from '../components/Plan'
import Illustration, { artFor } from '../components/Illustration'
import Stage from '../components/Stage'
import { Rich, VerseList } from '../components/Scripture'
import { Pager, Paras, Resources, Terms } from '../components/Bits'
import { getSymbol, zones } from '../data/symbols'

const zoneColour = { court: 'var(--court)', holy: 'var(--holy)', most: 'var(--most)' }

export default function SymbolPage() {
  const { id = '' } = useParams()
  const s = getSymbol(id)
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [pair, setPair] = useState<string | undefined>()
  const [torn, setTorn] = useState(false)

  useEffect(() => {
    setPair(undefined)
    setTorn(false)
  }, [id])

  if (!s) return <Navigate to="/" replace />

  const fade = {
    initial: { opacity: 0, y: reduce ? 0 : 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -6 },
    transition: { duration: reduce ? 0 : 0.4, ease: 'easeOut' as const },
  }

  return (
    <>
      <Stage caption="Click any piece of furniture on the plan">
        <div className="stage-split">
          <div className="plan-pane">
            <Plan focus={s.id} pair={pair} onSelect={(x) => navigate(`/symbol/${x}`)} dimOutside />
          </div>
          <div className="art-pane">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={s.id} initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduce ? 1 : 1.02 }} transition={{ duration: reduce ? 0 : 0.45 }}>
                <Illustration id={s.id} torn={torn} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div className="stage-title" key={s.id} {...fade}>
            <span className="st-name">{s.name}</span>
            <span className="st-zone">{zones[s.zone].name}</span>
          </motion.div>
        </AnimatePresence>
        {s.id === 'veil' && !artFor('veil') && (
          <div className="stage-action">
            <button className="btn on-night" onClick={() => setTorn((t) => !t)}>
              {torn ? 'Restore the veil' : 'Tear the veil'}
            </button>
          </div>
        )}
      </Stage>

      <div className="commentary">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={s.id} {...fade}>
            <div className="prose">
              <div className="zone-pill">
                <span className="swatch" style={{ background: zoneColour[s.zone] }} />
                {zones[s.zone].name}, the phase of {zones[s.zone].phase.toLowerCase()}
              </div>
              <h1>{s.name}</h1>
              <p className="lede">{s.tagline}</p>

              <dl className="facts">
                <div>
                  <dt>How it was made</dt>
                  <dd><Rich text={s.build} /></dd>
                </div>
                {s.measure && (
                  <div>
                    <dt>Size</dt>
                    <dd>{s.measure}</dd>
                  </div>
                )}
              </dl>

              <h2>How it was used</h2>
              <p><Rich text={s.service} /></p>

              <h2>What it points to</h2>
              <p><Rich text={s.christ} /></p>

              <h2>Looking closer</h2>
              <Paras items={s.deeper} />
            </div>

            <h2>Key words</h2>
            <Terms terms={s.terms} />

            <h2>How it connects</h2>
            <p className="prose" style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
              Point at a connection to see both pieces on the plan.
            </p>
            <ul className="links">
              {s.links.map((l) => {
                const t = getSymbol(l.to)
                if (!t) return null
                return (
                  <li key={l.to}>
                    <Link
                      to={`/symbol/${l.to}`}
                      onMouseEnter={() => setPair(l.to)}
                      onMouseLeave={() => setPair(undefined)}
                      onFocus={() => setPair(l.to)}
                      onBlur={() => setPair(undefined)}
                    >
                      <span className="ln-name">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12 Q8 0 14 12" /><circle cx="2" cy="12" r="1.6" fill="currentColor" /><circle cx="14" cy="12" r="1.6" fill="currentColor" /></svg>
                        {t.name}
                      </span>
                      <span className="ln-text">{l.text}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="callout prose">
              <h2>For today</h2>
              <p><Rich text={s.life} /></p>
            </div>

            <h2>Scripture</h2>
            <VerseList verses={s.verses} />

            <h2>Further reading</h2>
            <Resources items={s.resources} />

            <Pager path={`/symbol/${s.id}`} />
          </motion.article>
        </AnimatePresence>
      </div>
    </>
  )
}
