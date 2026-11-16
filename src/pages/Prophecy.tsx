import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import Stage from '../components/Stage'
import { Rich, VerseList, VerseRef } from '../components/Scripture'
import { Pager, Paras, Resources, Terms } from '../components/Bits'
import { prophecyKeys, prophecyPeriods, prophecyTerms } from '../data/extras'
import { R, type Para } from '../data/symbols'

// Elapsed years from autumn 457 BC (no year zero).
const meaning: { title: string; paras: Para[] } = {
  title: 'A prophecy centred on Christ',
  paras: [
    `It is easy to treat the 2,300 days as a puzzle of dates, but the prophecy is really about Christ. The seventy weeks name the year He would be anointed, the time He would die and the turning of the gospel to the nations. The longer period then carries His work forward into the heavenly sanctuary, all the way to its final phase.`,
    {
      quote: 'The time of Christ\'s coming, His anointing by the Holy Spirit, His death, and the giving of the gospel to the Gentiles, were definitely pointed out.',
      by: 'Ellen G. White',
      source: 'The Desire of Ages, p. 234',
    },
    `The link between the two chapters is what holds the whole calculation together. Gabriel was sent to make Daniel understand the mar'eh he had not understood, and his first words were about a period of time that was cut off. Bible students in the nineteenth century saw that this is the hinge of the prophecy: if the seventy weeks are the first part of the 2,300 days, then the starting point of one is the starting point of the other.`,
    {
      quote: 'Beyond question the seventy weeks are cut off from some other period; and just as evidently that other period is the 2300 days of chapter 8.',
      by: 'Uriah Smith',
      source: 'Looking Unto Jesus (1898), ch. 21',
    },
    `Because the first part of the prophecy was fulfilled to the year, believers in the 1840s were confident the end of it would be too. They were right about the date and wrong about the event, and their disappointment drove them back to the text. There they found that "the sanctuary" of Daniel 8:14 is the one in heaven, where Christ serves as High Priest, and that its cleansing is the work pictured by the Day of Atonement.`,
    {
      quote: 'All the preceding specifications of the prophecy had been unquestionably fulfilled at the time appointed.',
      by: 'Ellen G. White',
      source: 'The Great Controversy, p. 410',
    },
    `So the prophecy ends where the whole sanctuary leads: with Christ finishing His work, the record of sin removed, God's character vindicated, and the kingdom given to "the saints of the most High" (Daniel 7:27). For the believer, that is not a date to fear but a reason for confidence. The same God who kept the appointment at the Jordan, at Calvary and at Stephen's death will keep the last one too.`,
  ],
}

const e = (y: number) => (y < 0 ? y + 457 : y + 456)
const L = 80
const W = 840
const top = (y: number) => L + (e(y) / 2300) * W
const low = (y: number) => L + (e(y) / 490) * W
const yr = (y: number) => (y < 0 ? `${-y} BC` : `AD ${y}`)

export default function Prophecy() {
  const [sel, setSel] = useState('remainder')
  const reduce = useReducedMotion()
  const p = prophecyPeriods.find((x) => x.id === sel)!
  const seventy = sel !== 'remainder'

  const seg = (id: string, x1: number, x2: number, y: number, h: number, fill: string, label: string) => (
    <g
      key={id + y}
      className="hit"
      role="button"
      tabIndex={0}
      aria-pressed={sel === id}
      aria-label={label}
      onClick={() => setSel(id)}
      onKeyDown={(ev) => (ev.key === 'Enter' || ev.key === ' ') && (ev.preventDefault(), setSel(id))}
    >
      <motion.rect
        x={x1}
        y={y}
        width={x2 - x1}
        height={h}
        rx={3}
        fill={fill}
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1, opacity: sel === id ? 1 : 0.6 }}
        transition={{ duration: reduce ? 0 : 0.9, ease: 'easeOut' }}
        style={{ transformOrigin: `${x1}px ${y}px` }}
        stroke={sel === id ? '#fff4cf' : 'none'}
        strokeWidth={2}
      />
      <text x={(x1 + x2) / 2} y={y + h / 2 + 6} textAnchor="middle" className="tip-label" fontSize={16} fill={sel === id ? '#0f1d33' : '#efe7d6'}>
        {label}
      </text>
    </g>
  )

  const tick = (x: number, y: number, label: string, up = true, colour = '#d8c39a', anchor: 'start' | 'middle' | 'end' = 'middle') => (
    <g key={label}>
      <line x1={x} x2={x} y1={y} y2={up ? y - 16 : y + 16} stroke={colour} strokeWidth={1.5} />
      <text x={x} y={up ? y - 22 : y + 34} textAnchor={anchor} className="tip-label" fontSize={14} fill={colour}>
        {label}
      </text>
    </g>
  )

  return (
    <>
      <Stage caption="Click a section of either timeline">
        <svg className="stage-svg" viewBox="0 0 1000 440" role="img" aria-label="Timeline of the 2,300 days and the 70 weeks">
          <text x={L} y={92} className="tip-label" fontSize={15} fill="#d8c39a">2,300 years (Daniel 8:14)</text>
          {seg('seventy', top(-457), top(34), 104, 34, '#9e2a2b', '490')}
          {seg('remainder', top(34), top(1844), 104, 34, '#c9a24a', '1,810 years')}
          {tick(top(-457), 138, '457 BC', false)}
          {tick(top(34), 138, 'AD 34', false)}
          {tick(top(1844), 138, '1844', false, '#f2c96b')}

          {/* zoom lines */}
          <path d={`M${top(-457)} 138 L${L} 268 M${top(34)} 138 L${L + W} 268`} stroke="#9e2a2b" strokeDasharray="4 5" opacity={seventy ? 0.9 : 0.4} />

          <text x={L} y={262} className="tip-label" fontSize={15} fill="#d8c39a">70 weeks: 490 years (Daniel 9:24-27)</text>
          {seg('sevenWeeks', low(-457), low(-408), 272, 34, '#5b2a5f', '7 weeks')}
          {seg('sixtyTwo', low(-408), low(27), 272, 34, '#24497f', '62 weeks')}
          {seg('lastWeek', low(27), low(34), 272, 34, '#9e2a2b', '1')}
          {tick(low(-457), 306, '457 BC', false)}
          {tick(low(-408), 306, '408 BC', false)}
          {tick(low(27), 272, 'AD 27 baptism', true, '#f2c96b', 'end')}
          {tick(low(31), 306, 'AD 31 cross', false, '#f2c96b', 'end')}
          {tick(low(34), 272, 'AD 34', true, '#d8c39a', 'start')}

          <text x={500} y={410} textAnchor="middle" className="tip-label" fontSize={20} fill="#f2c96b">
            {p.title}: {yr(p.start)} to {yr(p.end)}
          </text>
        </svg>
        <div className="stage-title">
          <span className="st-name">The 2,300 Days</span>
          <span className="st-zone">Daniel 8 and 9</span>
        </div>
      </Stage>

      <div className="commentary">
        <div className="prose">
          <h1>The 2,300 Days</h1>
          <p className="lede">The longest time prophecy in Scripture, and it is about the sanctuary.</p>
          <p>
            <Rich terms={prophecyTerms} text={`In Daniel 8 a little horn attacks the sanctuary and takes away "the daily," ha-tamid, the continual ministry of the sanctuary (Daniel 8:11-12). One angel asks another how long this will go on, and the answer is: "Unto two thousand and three hundred days; then shall the sanctuary be cleansed" (Daniel 8:14). The unit counted is 'ereb boqer, evening-morning, the language of the creation days, and the word for cleansed is nitsdaq, which also means set right or vindicated. Daniel is told the vision belongs to "the time of the end" (Daniel 8:17), and it leaves him sick, because no one understands it (Daniel 8:27).`} />
          </p>
          <p>
            <Rich terms={prophecyTerms} text={`In symbolic prophecy a day stands for a year (Numbers 14:34; Ezekiel 4:6). The context requires it here. The vision covers Medo-Persia, Greece and a power that lasts to "the time of the end," and 2,300 literal days, about six years, cannot reach that far. Jesus confirmed the year-for-a-day reading of Daniel's numbers when the 70 weeks were fulfilled in His own ministry.`} />
          </p>

          <h2>The key that unlocks it</h2>
          <p>
            <Rich terms={prophecyTerms} text={`Daniel 8 gives no starting point, but Daniel 9 does. Gabriel comes back and tells Daniel to "understand the matter, and consider the vision" (Daniel 9:23), using the word mar'eh, the same word used for the 2,300 days in Daniel 8:26. He then says that seventy shavu'im, seventy weeks of years, are nechtak, "determined," literally cut off, for Daniel's people. If they were cut off, they were cut from the only period in view, the 2,300 days, so both periods start together, with the decree to restore and build Jerusalem.`} />
          </p>
          <p>
            <Rich terms={prophecyTerms} text={`Click through the timeline above. The seventy weeks land precisely on Jesus' baptism, His death and the turning of the gospel to the Gentiles. A prophecy that hit the first three dates exactly should be trusted for the fourth.`} />
          </p>
        </div>

        <div className="callout prose">
          <h2>{p.title}</h2>
          <p><Rich text={p.text} terms={prophecyTerms} /></p>
          <p data-noread style={{ marginTop: 10, fontSize: '0.92rem' }}>
            {p.verses.map((v) => (
              <span key={v.ref} style={{ marginRight: 14 }}><VerseRef refText={v.ref} /></span>
            ))}
          </p>
        </div>

        <div className="prose">
          <h2>What began in 1844</h2>
          <p>
            <Rich terms={prophecyTerms} text={`The Bible students who studied this prophecy in the 1830s and early 1840s assumed "the sanctuary" was the earth and that Jesus would return in 1844. He did not come. Going back to the text, they found that the only sanctuary in the new covenant is the one in heaven, "which the Lord pitched, and not man" (Hebrews 8:2), and that it also needs cleansing (Hebrews 9:23). The date was right. The event was the beginning of Christ's Day-of-Atonement ministry in the most holy place, the pre-advent judgment of Daniel 7:9-14.`} />
          </p>
          <p>
            <Rich terms={prophecyTerms} text={`Daniel 7 and 8 run in parallel. Chapter 7 shows the same sequence of empires followed by the little horn, and then, instead of a cleansed sanctuary, a heavenly court that sits and opens the books (Daniel 7:10). The judgment and the cleansing are the same event seen from two angles. It ends with the kingdom given to "the saints of the most High" (Daniel 7:27). Revelation 14:6-7 turns it into a worldwide message: "Fear God, and give glory to him; for the hour of his judgment is come."`} />
          </p>
        </div>

        <div className="prose">
          <h2>{meaning.title}</h2>
          <Paras items={meaning.paras} terms={prophecyTerms} />
        </div>

        <h2>Key words</h2>
        <Terms terms={prophecyTerms} />

        <h2>Foundational texts</h2>
        <VerseList verses={prophecyKeys} />

        <h2>Further reading</h2>
        <Resources items={[R.goldstein, R.shea, R.seventy, R.gc23, R.smith, R.darcom]} />

        <Pager path="/sanctuary/prophecy" />
      </div>
    </>
  )
}
