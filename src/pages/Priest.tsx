import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import Stage from '../components/Stage'
import { Rich, VerseList, VerseRef } from '../components/Scripture'
import { Pager, Resources, Terms } from '../components/Bits'
import { garments, priestTerms, priestVerses, stones } from '../data/extras'
import { R } from '../data/symbols'

const C = { blue: '#24497f', purple: '#5b2a5f', scarlet: '#9e2a2b', linen: '#efe7d6', gold: '#c9a24a', hi: '#f6dc93' }

function Figure({ sel, onSel }: { sel: string; onSel: (id: string) => void }) {
  const [stone, setStone] = useState<number | null>(null)
  const part = (id: string) => ({
    className: 'hit',
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': garments.find((g) => g.id === id)?.name,
    onClick: () => onSel(id),
    onKeyDown: (e: React.KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSel(id)),
    style: { filter: sel === id ? 'drop-shadow(0 0 6px rgba(242,201,107,.9))' : undefined, transition: 'filter .3s' },
  })
  return (
    <svg className="stage-svg" viewBox="0 0 600 440" role="img" aria-label="The high priest's garments">
      <defs>
        <linearGradient id="pGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6dc93" />
          <stop offset="1" stopColor="#8a6a26" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="200" r="190" fill="#f2c96b" opacity="0.05" />
      {/* linen coat (sleeves and hem) */}
      <g {...part('linen')}>
        <path d="M218 128 L160 250 L182 258 L232 160 Z M382 128 L440 250 L418 258 L368 160 Z" fill={C.linen} />
        <path d="M232 380 L368 380 L374 420 L226 420 Z" fill={C.linen} />
        <circle cx="171" cy="262" r="12" fill="#c9a888" />
        <circle cx="429" cy="262" r="12" fill="#c9a888" />
      </g>
      {/* robe of blue */}
      <g {...part('robe')}>
        <path d="M232 112 L368 112 L392 384 L208 384 Z" fill={C.blue} />
        {Array.from({ length: 13 }, (_, i) => (
          <circle key={i} cx={214 + i * 14.3} cy={390} r={4.5} fill={i % 2 ? C.scarlet : C.hi} />
        ))}
      </g>
      {/* ephod */}
      <g {...part('ephod')}>
        <path d="M240 112 L360 112 L366 270 L234 270 Z" fill={C.purple} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={240 + i * 30} y={112} width={8} height={158} fill={[C.blue, C.scarlet, C.linen, C.gold][i]} opacity={0.6} />
        ))}
        <rect x="230" y="262" width="140" height="14" fill="url(#pGold)" />
      </g>
      {/* shoulders */}
      <g {...part('onyx')}>
        <ellipse cx="250" cy="118" rx="14" ry="10" fill="#3a3436" stroke="url(#pGold)" strokeWidth="4" />
        <ellipse cx="350" cy="118" rx="14" ry="10" fill="#3a3436" stroke="url(#pGold)" strokeWidth="4" />
      </g>
      {/* breastplate */}
      <g {...part('breastplate')}>
        <rect x="262" y="146" width="76" height="98" fill="url(#pGold)" rx="3" />
        {stones.map((st, i) => {
          const r = Math.floor(i / 3)
          const c = i % 3
          return (
            <rect
              key={st.name}
              x={268 + c * 23}
              y={152 + r * 23}
              width={18}
              height={18}
              rx={3}
              fill={st.color}
              stroke={stone === i ? '#fff' : '#5a4518'}
              strokeWidth={stone === i ? 2 : 1}
              onMouseEnter={() => setStone(i)}
              onMouseLeave={() => setStone(null)}
            />
          )
        })}
      </g>
      {/* head and mitre */}
      <circle cx="300" cy="84" r="24" fill="#c9a888" />
      <path d="M300 106 q-14 24 0 30 q14 -6 0 -30" fill="#8d7b6a" opacity="0.6" />
      <g {...part('mitre')}>
        <path d="M272 70 Q300 30 328 70 L326 78 L274 78 Z" fill={C.linen} />
        <rect x="286" y="62" width="28" height="10" rx="2" fill="url(#pGold)" />
        <path d="M282 72 L270 64 M318 72 L330 64" stroke={C.blue} strokeWidth="2" />
      </g>
      {stone !== null && (
        <text x="300" y="30" textAnchor="middle" className="tip-label" fill="#f2c96b" fontSize="18">
          Row {Math.floor(stone / 3) + 1}: {stones[stone].name}
        </text>
      )}
    </svg>
  )
}

export default function Priest() {
  const [sel, setSel] = useState('breastplate')
  const reduce = useReducedMotion()
  const g = garments.find((x) => x.id === sel)!

  return (
    <>
      <Stage caption="Click a garment. Point at a stone in the breastplate to read its name.">
        <div className="stage-split">
          <div className="plan-pane">
            <Figure sel={sel} onSel={setSel} />
          </div>
          <div className="art-pane priest-card">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={sel} initial={{ opacity: 0, x: reduce ? 0 : 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35 }}>
                <div className="pc-inner">
                  <div className="pc-name">{g.name}</div>
                  <div className="pc-term">
                    <span lang="he">{g.term.word}</span> <em>{g.term.translit}</em>: {g.term.meaning}
                  </div>
                  <p>{g.christ}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="stage-title">
          <span className="st-name">The High Priest</span>
          <span className="st-zone">Exodus 28</span>
        </div>
      </Stage>

      <div className="commentary">
        <div className="prose">
          <h1>The High Priest</h1>
          <p className="lede">Dressed in the sanctuary, carrying the people.</p>
          <p>
            <Rich text={`The furniture shows what God does. The priesthood shows who does it. Aaron's garments were made "for glory and for beauty" (Exodus 28:2), and nearly every piece repeats the materials of the sanctuary itself. When the high priest walked into the holy place, he was a moving picture of the whole building, and of the One the building pointed to.`} />
          </p>
          <p>
            <Rich text={`Hebrews spends five chapters on this subject. Its main point is that "we have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; a minister of the sanctuary, and of the true tabernacle" (Hebrews 8:1-2). Aaron's line served because they were descended from Levi. Christ serves "after the power of an endless life" (Hebrews 7:16). Earthly priests died and were replaced. He "ever liveth to make intercession" (Hebrews 7:25). They offered animals. He offered Himself (Hebrews 9:12).`} />
          </p>
          <p>
            <Rich text={`He also understands us. "We have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin" (Hebrews 4:15). Under the old system you needed a priest who was one of you. Under the new one you have Him.`} />
          </p>
        </div>

        <h2>The garments</h2>
        <ul className="item-list prose">
          {garments.map((x) => (
            <li key={x.id} className={x.id === sel ? 'current' : ''}>
              <button className="item-title" onClick={() => setSel(x.id)}>{x.name}</button>
              <p><Rich text={x.text} /></p>
              <p className="christ"><Rich text={x.christ} /></p>
              <p style={{ fontSize: '0.92rem' }}>
                {x.verses.map((v) => (
                  <span key={v.ref} style={{ marginRight: 14 }}><VerseRef refText={v.ref} /></span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <h2>Key words</h2>
        <Terms terms={priestTerms} />

        <h2>Scripture</h2>
        <VerseList verses={priestVerses} />

        <h2>Further reading</h2>
        <Resources items={[R.andreasen, R.hardinge, R.davidson]} />

        <Pager path="/sanctuary/priest" />
      </div>
    </>
  )
}
