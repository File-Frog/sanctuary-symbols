import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import Stage from '../components/Stage'
import { Rich, VerseList, VerseRef } from '../components/Scripture'
import { Pager, Paras, Resources, Terms } from '../components/Bits'
import { garments, priestTerms, priestVerses, stones } from '../data/extras'
import { R, type Para } from '../data/symbols'
import priestArt from '../assets/priest.webp'

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


// Clickable areas over the painting, in the painting's own pixel coordinates (1024 × 1536).
const AREAS: { id: string; shape: 'path' | 'circle' | 'rect' | 'ellipse'; d?: string; c?: number[] }[] = [
  { id: 'linen', shape: 'path', d: 'M268 1300 L700 1300 L705 1420 L268 1420 Z M240 540 L345 560 L335 800 L255 805 Z M680 560 L760 540 L762 800 L690 790 Z' },
  { id: 'robe', shape: 'path', d: 'M262 1095 L725 1095 L722 1240 L735 1300 L255 1300 L262 1240 Z M330 300 L238 530 L300 555 L330 450 Z M690 300 L760 535 L700 555 L690 450 Z' },
  { id: 'ephod', shape: 'path', d: 'M330 290 L690 290 L700 560 L712 1100 L500 1105 L272 1100 L300 560 Z' },
  { id: 'onyx', shape: 'path', d: 'M366 298 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0 Z M606 300 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0 Z' },
  { id: 'breastplate', shape: 'rect', c: [425, 377, 187, 168] },
  { id: 'mitre', shape: 'ellipse', c: [498, 100, 92, 60] },
]
// The twelve stones, row by row, three to a row.
const STONE_X = [439, 494, 549]
const STONE_Y = [388, 425, 463, 501]

function Figure({ sel, onSel }: { sel: string; onSel: (id: string) => void }) {
  const [stone, setStone] = useState<number | null>(null)
  const part = (id: string) => ({
    className: `hit ph${sel === id ? ' on' : ''}`,
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': garments.find((g) => g.id === id)?.name,
    onClick: () => onSel(id),
    onKeyDown: (e: React.KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSel(id)),
  })
  return (
    <div className="priest-paint">
      <img className="painting-bg" src={priestArt} alt="" aria-hidden="true" />
      <svg className="priest-svg" viewBox="0 0 1024 1536" preserveAspectRatio="xMaxYMid meet" role="img" aria-label="The high priest's garments">
        <image href={priestArt} width="1024" height="1536" />
        {AREAS.map((a) => (
          <g key={a.id} {...part(a.id)}>
            {a.shape === 'path' && <path d={a.d} />}
            {a.shape === 'rect' && <rect x={a.c![0]} y={a.c![1]} width={a.c![2]} height={a.c![3]} rx={6} />}
            {a.shape === 'ellipse' && <ellipse cx={a.c![0]} cy={a.c![1]} rx={a.c![2]} ry={a.c![3]} />}
          </g>
        ))}
        <g pointerEvents="none">
          {stones.map((st, i) => (
            <rect
              key={st.name}
              x={STONE_X[i % 3]}
              y={STONE_Y[Math.floor(i / 3)]}
              width={46}
              height={32}
              rx={5}
              className={`stone${stone === i ? ' on' : ''}`}
              pointerEvents="all"
              onMouseEnter={() => setStone(i)}
              onMouseLeave={() => setStone(null)}
              onClick={() => onSel('breastplate')}
            />
          ))}
        </g>
        {stone !== null && (
          <g pointerEvents="none">
            <rect x="262" y="1452" width="500" height="64" rx="12" fill="rgba(15,29,51,.82)" />
            <text x="512" y="1496" textAnchor="middle" className="tip-label" fill="#f2c96b" fontSize="36">
              Row {Math.floor(stone / 3) + 1}: {stones[stone].name}
            </text>
          </g>
        )}
      </svg>
    </div>
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
