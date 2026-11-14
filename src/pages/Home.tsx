import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Plan from '../components/Plan'
import Stage from '../components/Stage'
import { Rich } from '../components/Scripture'
import { Pager } from '../components/Bits'
import { symbols, zones, type Zone } from '../data/symbols'

const zoneColour: Record<Zone, string> = { court: 'var(--court)', holy: 'var(--holy)', most: 'var(--most)' }

export default function Home() {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  return (
    <>
      <Stage caption="The tabernacle drawn to scale. Click any piece of furniture.">
        <div className="home-plan">
          <Plan intro onSelect={(id) => navigate(`/sanctuary/symbol/${id}`)} />
        </div>
        <motion.div
          className="hero-text"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 2.8, duration: 0.9 }}
        >
          <p className="hero-verse">Thy way, O God, is in the sanctuary</p>
          <p className="hero-ref">Psalm 77:13</p>
        </motion.div>
      </Stage>

      <div className="commentary">
        <div className="prose">
          <h1>The Sanctuary</h1>
          <p className="lede">The gospel, drawn as a floor plan.</p>
          <p>
            <Rich text={`At Sinai God gave Moses a building project with a remarkable purpose: "Let them make me a sanctuary; that I may dwell among them" (Exodus 25:8). For nearly five centuries, until Solomon built the temple, this portable tent was the centre of Israel's worship. Every board, colour, measurement and ritual was specified. God was not fussing over upholstery. He was giving His people a working model of how He saves sinners, built "after their pattern, which was shewed thee in the mount" (Exodus 25:40), a copy of the real sanctuary in heaven (Hebrews 8:5).`} />
          </p>
          <p>
            <Rich text={`Asaph wrote, "Thy way, O God, is in the sanctuary" (Psalm 77:13). Walk from the gate to the ark and you follow the plan of salvation in order: sacrifice, cleansing, daily life with God, intercession, judgment, and finally God's presence without a veil.`} />
          </p>

          <h2>Two rooms, two phases</h2>
          <p>
            <Rich text={`The tent had two rooms, and the priests had two kinds of work. All year long they ministered every day in the holy place. Once a year, on the Day of Atonement, the high priest entered the most holy place to cleanse the sanctuary. Hebrews applies the same pattern to Christ (Hebrews 9:6-12). He began His priestly ministry in heaven after His ascension. At the end of the 2,300-year prophecy of Daniel 8:14, in 1844, He began the closing work that the Day of Atonement pictured. That closing work is the judgment that comes before His return.`} />
          </p>

          <h2>How to read the symbols</h2>
          <p>
            <Rich text={`Scripture interprets its own types. Hebrews calls the earthly tent "a figure for the time then present" (Hebrews 9:9) and reads each part in light of Christ. As Richard Davidson puts it, a biblical type is a real historical person, event or institution that God designed in advance to point to a greater fulfilment, and the fulfilment always outshines the type. This study follows that method. Where a meaning rests on a direct statement of Scripture, the verse is given. Where a meaning comes from a long tradition of devotional reading, the text says so.`} />
          </p>
        </div>

        <div className="zone-row">
          {(Object.keys(zones) as Zone[]).map((z) => (
            <div className="zone-col" key={z}>
              <div className="colour-bar" style={{ background: zoneColour[z] }} />
              <h3>{zones[z].name}</h3>
              <div className="phase">{zones[z].phase}</div>
              <p style={{ fontSize: '0.98rem', marginTop: 8 }}>{zones[z].summary}</p>
              <ul>
                {symbols.filter((s) => s.zone === z).map((s) => (
                  <li key={s.id}>
                    <Link to={`/sanctuary/symbol/${s.id}`}>{s.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2>Ways to study</h2>
        <div className="paths">
          <Link className="path-card" to="/sanctuary/symbol/gate">
            <strong>Walk the sanctuary</strong>
            <span>Start at the gate and move inward, one piece of furniture at a time.</span>
          </Link>
          <Link className="path-card" to="/sanctuary/services/daily">
            <strong>Watch the services</strong>
            <span>Follow the blood from the altar to the mercy seat, day by day and year by year.</span>
          </Link>
          <Link className="path-card" to="/sanctuary/prophecy">
            <strong>Trace the 2,300 days</strong>
            <span>From the decree of 457 BC to the cross to 1844, on one timeline.</span>
          </Link>
          <Link className="path-card" to="/sanctuary/quiz">
            <strong>Test yourself</strong>
            <span>Twelve questions to check what has stuck.</span>
          </Link>
        </div>

        <Pager path="/sanctuary" />
      </div>
    </>
  )
}
