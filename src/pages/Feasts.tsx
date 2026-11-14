import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import Stage from '../components/Stage'
import { Rich, VerseRef } from '../components/Scripture'
import { Pager, Resources } from '../components/Bits'
import { feasts } from '../data/extras'
import { R } from '../data/symbols'

// Positions along the sacred year (x in a 1000-wide box).
const X = [120, 175, 230, 380, 700, 790, 880]

export default function Feasts() {
  const [sel, setSel] = useState(0)
  const reduce = useReducedMotion()
  const f = feasts[sel]

  return (
    <>
      <Stage caption="The sacred year, from the first month (Abib) to the seventh (Tishri)">
        <svg className="stage-svg" viewBox="0 0 1000 440" role="img" aria-label="The seven feasts of Leviticus 23 on the sacred calendar">
          <defs>
            <linearGradient id="yearBand" x1="0" x2="1">
              <stop offset="0" stopColor="#3f7a4f" />
              <stop offset="0.45" stopColor="#c9a24a" />
              <stop offset="1" stopColor="#9e2a2b" />
            </linearGradient>
          </defs>
          {/* advent brackets */}
          <path d="M100 150 v-14 h300 v14" stroke="#d8c39a" fill="none" strokeWidth="1.5" />
          <text x="250" y="124" textAnchor="middle" className="tip-label" fill="#d8c39a" fontSize="17">Spring feasts: fulfilled at Christ's first coming</text>
          <path d="M680 150 v-14 h220 v14" stroke="#f2c96b" fill="none" strokeWidth="1.5" />
          <text x="790" y="124" textAnchor="middle" className="tip-label" fill="#f2c96b" fontSize="17">Autumn feasts: fulfilled in the last days</text>

          {/* the year band */}
          <rect x="80" y="214" width="840" height="10" rx="5" fill="url(#yearBand)" opacity="0.85" />
          <text x="540" y="256" textAnchor="middle" className="tip-label" fill="#d8c39a" fontSize="15" opacity="0.7">the long summer harvest</text>

          {feasts.map((fe, i) => (
            <g
              key={fe.name}
              className="hit"
              role="button"
              tabIndex={0}
              aria-label={fe.name}
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSel(i))}
            >
              <circle cx={X[i]} cy={219} r={i === sel ? 20 : 13} fill={i === sel ? '#9e2a2b' : '#0f1d33'} stroke="#f2c96b" strokeWidth={2} style={{ transition: 'r .3s' }} />
              <text x={X[i]} y={i % 2 ? 190 : 296} textAnchor="middle" className="tip-label" fill={i === sel ? '#f2c96b' : '#efe7d6'} fontSize={i === sel ? 19 : 16}>
                {fe.name}
              </text>
            </g>
          ))}

          <AnimatePresence mode="wait">
            <motion.g key={sel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35 }}>
              <text x="500" y="352" textAnchor="middle" className="tip-label" fill="#f2c96b" fontSize="24">
                {f.name} ({f.hebrew}, {f.meaning})
              </text>
              <text x="500" y="384" textAnchor="middle" fill="#d8c39a" fontSize="17" fontStyle="italic" fontFamily="Spectral, serif">
                {f.date}
              </text>
            </motion.g>
          </AnimatePresence>
        </svg>
        <div className="stage-title">
          <span className="st-name">The Feasts</span>
          <span className="st-zone">Leviticus 23</span>
        </div>
      </Stage>

      <div className="commentary">
        <div className="prose">
          <h1>The Feasts</h1>
          <p className="lede">God's calendar is a prophecy as well.</p>
          <p>
            <Rich text={`Leviticus 23 lists seven annual feasts, which God calls "my feasts" (Leviticus 23:2). They fall into two clusters. Four come in spring, around the barley harvest. Three come in the seventh month, at the end of the agricultural year. Paul says these festivals were "a shadow of things to come; but the body is of Christ" (Colossians 2:16-17). They pointed forward to events in the plan of salvation, and they met their fulfilment on schedule.`} />
          </p>
          <p>
            <Rich text={`The spring feasts were fulfilled to the day at Christ's first coming. He died on Passover, rested in the tomb during Unleavened Bread, rose on the day of Firstfruits, and poured out the Spirit at Pentecost. The autumn feasts belong to the closing events. The summer harvest between them corresponds to the long age of the gospel.`} />
          </p>
        </div>

        <ul className="item-list">
          {feasts.map((fe, i) => (
            <li key={fe.name} className={i === sel ? 'current' : ''}>
              <button className="item-title" onClick={() => setSel(i)}>
                {fe.name} <span style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ink-soft)' }}>({fe.hebrew}, {fe.meaning}; {fe.date})</span>
              </button>
              <p><Rich text={fe.type} /></p>
              <p className="christ"><Rich text={fe.fulfilment} /></p>
              <p className="refs" style={{ fontSize: '0.92rem' }}>
                {fe.verses.map((v) => (
                  <span key={v.ref} style={{ marginRight: 14 }}><VerseRef refText={v.ref} /></span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <div className="callout prose">
          <h2>Why the timing matters</h2>
          <p>
            <Rich text={`If the spring feasts were fulfilled on the exact days of their types, the autumn feasts should be fulfilled on time as well. That is the logic that sent nineteenth-century Bible students to Daniel 8:14 and its 2,300 years. The prophecy ends in 1844, and the Day of Atonement that year fell on October 22 by the ancient Jewish reckoning.`} />
          </p>
        </div>

        <h2>Further reading</h2>
        <Resources items={[R.haskell, R.andreasen, R.gc23]} />

        <Pager path="/feasts" />
      </div>
    </>
  )
}
