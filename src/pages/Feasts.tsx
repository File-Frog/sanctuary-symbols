import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import Stage from '../components/Stage'
import { Rich, VerseRef } from '../components/Scripture'
import { Pager, Paras, Resources, Terms } from '../components/Bits'
import { feasts, feastTerms } from '../data/extras'
import { R, type Para } from '../data/symbols'

const meaning: { title: string; paras: Para[] } = {
  title: 'Appointments God keeps',
  paras: [
    `The feasts were more than holidays. Each one remembered something God had already done for Israel, and each one also pointed to something He was going to do. Passover looked back to the night in Egypt when the destroyer passed over the houses marked with blood, and it looked forward to a greater deliverance.`,
    {
      quote: 'On the fourteenth day of the month, at even, the Passover was celebrated, its solemn, impressive ceremonies commemorating the deliverance from bondage in Egypt, and pointing forward to the sacrifice that should deliver from the bondage of sin.',
      by: 'Ellen White',
      source: 'Patriarchs and Prophets, p. 539',
    },
    `The spring feasts show how precisely God kept those appointments. Jesus died at Passover, at the hour of the evening sacrifice. He rested in the tomb over the Sabbath of Unleavened Bread. He rose on the day the 'omer, the first sheaf, was waved before the LORD, and Paul calls Him "the firstfruits of them that slept" (1 Corinthians 15:20). Fifty days later, on Shavuot, the Spirit fell and the first great harvest of believers was gathered in. Each feast met its fulfilment on its own day.`,
    {
      quote: 'These types were fulfilled, not only as to the event, but as to the time.',
      by: 'Ellen White',
      source: 'The Great Controversy, p. 399',
    },
    `The autumn feasts follow the same pattern, but they belong to the end of the story. The teru'ah of the trumpets called Israel to get ready, the Day of Atonement brought the judgment and the cleansing of the sanctuary, and the Feast of Tabernacles followed with joy. Five days after the people were made clean, they were living in booths and celebrating the harvest. In the same way, the last message of warning leads to the judgment, and the judgment leads to the great ingathering when Christ returns.`,
    {
      quote: 'The Feast of Tabernacles began five days after the day of atonement, and all Israel were rejoicing in their acceptance with God, and also for the bounties of the harvest which had been gathered.',
      by: 'Stephen Haskell',
      source: 'The Cross and Its Shadow (1914), ch. 32',
    },
    `Sukkot also looked back and forward at once. The booths reminded Israel that God had sheltered them in the wilderness, and the harvest pointed to the day when He will gather His people home. Jesus stood up on the last great day of that feast and cried, "If any man thirst, let him come unto me, and drink" (John 7:37). The feast will reach its fulfilment when "the tabernacle of God is with men" (Revelation 21:3) and God's people live in His presence for ever.`,
    {
      quote: 'THE Feast of Tabernacles was the last feast in the yearly round of service, and typified the final consummation of the entire plan of redemption.',
      by: 'Stephen Haskell',
      source: 'The Cross and Its Shadow (1914), ch. 32',
    },
    `The ceremonies themselves ended at the cross, because the shadow gives way when the body it pointed to arrives (Colossians 2:16-17). But the lesson of the mo'adim remains. God keeps His appointments. What He did on time at Christ's first coming, He will finish on time at the end.`,
  ],
}

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
            <Rich terms={feastTerms} text={`Leviticus 23 lists seven annual feasts, and God calls them "my feasts" (Leviticus 23:2). The Hebrew word is mo'adim, appointed times, the same word used for the "seasons" the sun and moon were made to mark (Genesis 1:14). Each one was a miqra qodesh, a holy convocation that God Himself called. They fall into two groups. Four come in the spring, around the barley and wheat harvests, and three come in the seventh month, at the end of the farming year. Paul says these festivals were "a shadow of things to come; but the body is of Christ" (Colossians 2:16-17). They pointed forward to events in the plan of salvation, and they met their fulfilment on schedule.`} />
          </p>
          <p>
            <Rich terms={feastTerms} text={`The spring feasts were fulfilled to the day at Christ's first coming. He died at Passover, rested in the tomb during Unleavened Bread, rose on the day of Firstfruits, and poured out the Spirit at Pentecost. The autumn feasts belong to the closing events of history, and the long summer harvest between the two groups corresponds to the age of the gospel.`} />
          </p>
        </div>

        <ul className="item-list">
          {feasts.map((fe, i) => (
            <li key={fe.name} className={i === sel ? 'current' : ''}>
              <button className="item-title" onClick={() => setSel(i)}>
                {fe.name} <span style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ink-soft)' }}>({fe.hebrew}, {fe.meaning}; {fe.date})</span>
              </button>
              <p><Rich text={fe.type} terms={feastTerms} /></p>
              <p className="christ"><Rich text={fe.fulfilment} terms={feastTerms} /></p>
              <p className="refs" style={{ fontSize: '0.92rem' }}>
                {fe.verses.map((v) => (
                  <span key={v.ref} style={{ marginRight: 14 }}><VerseRef refText={v.ref} /></span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <div className="prose">
          <h2>{meaning.title}</h2>
          <Paras items={meaning.paras} terms={feastTerms} />
        </div>

        <div className="callout prose">
          <h2>Why the timing matters</h2>
          <p>
            <Rich text={`If the spring feasts were fulfilled on the exact days of their types, the autumn feasts should be fulfilled on time as well. That is the logic that sent nineteenth-century Bible students to Daniel 8:14 and its 2,300 years. The prophecy ends in 1844, and the Day of Atonement that year fell on October 22 by the ancient Jewish reckoning.`} />
          </p>
        </div>

        <h2>Key words</h2>
        <Terms terms={feastTerms} />

        <h2>Further reading</h2>
        <Resources items={[R.pp52, R.haskell, R.andreasen, R.gc23]} />

        <Pager path="/sanctuary/feasts" />
      </div>
    </>
  )
}
