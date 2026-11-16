import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import Stage from '../components/Stage'
import { Rich, VerseList, VerseRef } from '../components/Scripture'
import { Pager, Paras, Resources, Terms } from '../components/Bits'
import { garments, priestTerms, priestVerses, stones } from '../data/extras'
import { R, type Para } from '../data/symbols'

// Original-language words to highlight: the general terms plus each garment's own word.
const allTerms = [...priestTerms, ...garments.map((x) => x.term)]

// The card in the picture shows a short form of the lesson; the full text is in the list below.
function brief(text: string) {
  const parts = text.split(/(?<=[.!?]["”)]?)\s+(?=[A-Z"“])/)
  return parts[0].length < 70 && parts[1] && (parts[0] + ' ' + parts[1]).length <= 170 ? `${parts[0]} ${parts[1]}` : parts[0]
}

const meaning: { title: string; paras: Para[] } = {
  title: 'A Priest who carries us',
  paras: [
    `Of all the priests in Israel, the high priest stood closest to the meaning of the sanctuary. The ordinary priests served in the court and the holy place, but he alone went into the most holy place, and he alone wore the garments that carried the names of the tribes.`,
    {
      quote: 'God designed that the high priest should more nearly represent Christ than any other priest.',
      by: 'Stephen N. Haskell',
      source: 'The Cross and Its Shadow (1914), ch. 9',
    },
    `The most striking thing about his dress is where the names of God's people were placed. They were engraved on the shoulder stones, so he carried Israel on his strength, and on the breastplate, so he carried them over his heart. He could not go in before God without bringing them with him. God says the same to His people through Isaiah: "Behold, I have graven thee upon the palms of my hands" (Isaiah 49:16).`,
    {
      quote: 'So Christ, the great High Priest, pleading His blood before the Father in the sinner\'s behalf, bears upon His heart the name of every repentant, believing soul.',
      by: 'Ellen G. White',
      source: 'Patriarchs and Prophets, p. 351',
    },
    `A priest was consecrated by mille' yad, the filling of his hands. Blood was put on his right ear, his right thumb and his right great toe, so that everything he heard, did and walked toward belonged to God (Leviticus 8:23-24). Christ's consecration went further still. He did not need blood for His own sins, because He had none; He offered His own blood for ours (Hebrews 9:12). And unlike Aaron, He holds His priesthood for ever, "after the order of Melchisedec" (Hebrews 5:6). Malki-tsedeq means king of righteousness, and Christ is both King and Priest at once.`,
    `The high priest also had one rule about his clothes that the Gospels bring into sharp focus. He was never to tear his garments (Leviticus 21:10), and the robe was even woven so "that it be not rent" (Exodus 28:32). Yet on the night of Jesus' trial, Caiaphas the high priest tore his clothes in anger (Matthew 26:65). The next day, the soldiers would not tear Jesus' coat, because it was "without seam, woven from the top throughout" (John 19:23-24). In that moment the old priesthood disqualified itself, and the true High Priest went to the cross with His robe whole.`,
    `Finally, what Aaron wore alone, Christ shares with His people. John saw Him in heaven "clothed with a garment down to the foot, and girt about the paps with a golden girdle" (Revelation 1:13), dressed as a priest. And He has made His people "kings and priests unto God" (Revelation 1:6). The linen of His righteousness is given to everyone who trusts Him.`,
    {
      quote: 'Only the family of Aaron could wear the rich garments of the priest; but there are robes of "fine linen, clean and white," in store for every overcomer.',
      by: 'Stephen N. Haskell',
      source: 'The Cross and Its Shadow (1914), ch. 12',
    },
  ],
}

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
                  <p>{brief(g.christ)}</p>
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
            <Rich terms={allTerms} text={`The furniture shows what God does, and the priesthood shows who does it. Aaron was the kohen gadol, the "great priest," and his garments were made "for glory and for beauty" (Exodus 28:2). Nearly every piece repeated the colours and materials of the sanctuary itself. When the high priest walked into the holy place, he was a moving picture of the whole building, and of the One the building pointed to.`} />
          </p>
          <p>
            <Rich terms={allTerms} text={`Hebrews spends five chapters on this subject. It calls Jesus our archiereus, our High Priest, and its main point is that "we have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; a minister of the sanctuary, and of the true tabernacle" (Hebrews 8:1-2). The word for minister there is leitourgos, one who serves in public worship. Aaron's sons served because they were descended from Levi, but Christ serves "after the power of an endless life" (Hebrews 7:16). Earthly priests died and were replaced, while He "ever liveth to make intercession" (Hebrews 7:25). They offered animals, but He offered Himself (Hebrews 9:12).`} />
          </p>
          <p>
            <Rich terms={allTerms} text={`He also understands us. "We have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin" (Hebrews 4:15). Under the old system the people needed a priest who was one of them. Under the new one they have Him.`} />
          </p>
        </div>

        <h2>The garments</h2>
        <ul className="item-list prose">
          {garments.map((x) => (
            <li key={x.id} className={x.id === sel ? 'current' : ''}>
              <button className="item-title" onClick={() => setSel(x.id)}>{x.name}</button>
              <p><Rich text={x.text} terms={allTerms} /></p>
              <p className="christ"><Rich text={x.christ} terms={allTerms} /></p>
              <p style={{ fontSize: '0.92rem' }}>
                {x.verses.map((v) => (
                  <span key={v.ref} style={{ marginRight: 14 }}><VerseRef refText={v.ref} /></span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <div className="prose">
          <h2>{meaning.title}</h2>
          <Paras items={meaning.paras} terms={allTerms} />
        </div>

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
