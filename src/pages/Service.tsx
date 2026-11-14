import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Plan from '../components/Plan'
import Stage from '../components/Stage'
import { Rich, VerseRef } from '../components/Scripture'
import { Pager, Resources, Terms } from '../components/Bits'
import { dailySteps, dailyTerms, yearlySteps, yearlyTerms, type Step } from '../data/extras'
import { R, type Resource, type Term } from '../data/symbols'

interface Config {
  path: string
  title: string
  lede: string
  intro: string[]
  steps: Step[]
  terms: Term[]
  colour: string
  closing: { title: string; text: string }
  resources: Resource[]
}

const configs: Record<'daily' | 'atonement', Config> = {
  daily: {
    path: '/services/daily',
    title: 'The Daily Service',
    lede: 'Forgiveness, every day of the year.',
    intro: [
      `Most of what happened at the sanctuary was the daily service, the tamid. It had two parts. The first was a lamb offered for the whole nation every morning and evening. The second was the stream of personal offerings brought by individuals who had sinned. In both, the pattern was the same: a substitute died, and its blood was carried toward God.`,
      `Follow the steps below and watch the route on the plan. The blood travels inward from the court to the holy place, and with it goes the record of sin.`,
    ],
    steps: dailySteps,
    terms: dailyTerms,
    colour: '#e26a2c',
    closing: {
      title: 'Where this leaves us',
      text: `The sinner went home forgiven that same day (Leviticus 4:31). But the sin had been carried into the sanctuary, which now held a record of forgiven guilt. That record had to be dealt with eventually, and that is the subject of the Day of Atonement. In the same way, Christ's death secures full forgiveness the moment we confess, and His ministry in heaven carries the plan through to its end (Hebrews 7:25).`,
    },
    resources: [R.gane, R.andreasen, R.pp30],
  },
  atonement: {
    path: '/services/atonement',
    title: 'The Day of Atonement',
    lede: 'The year\'s record of sin, removed.',
    intro: [
      `Everything in the daily service led up to one day in the seventh month. On Yom Kippur the high priest went into the most holy place, cleansed the sanctuary of the year's accumulated record, and sent the scapegoat into the wilderness. Israel treated it as a day of judgment. It sorted the loyal from the indifferent, and it ended with a clean camp.`,
      `Daniel 8:14, Daniel 7 and Hebrews 9 all point to a heavenly fulfilment of this day. That is why the 2,300-day prophecy is a sanctuary prophecy.`,
    ],
    steps: yearlySteps,
    terms: yearlyTerms,
    colour: '#f2c96b',
    closing: {
      title: 'Good news about the judgment',
      text: `For Israel, the Day of Atonement was not a threat to anyone who had confessed and stayed loyal. It was the day their record was cleared. The judgment works the same way for the believer. Daniel sees it end with "judgment was given to the saints" (Daniel 7:22). The question in the judgment is not whether we were good enough. It is whether we are in Christ, and He is our High Priest, our Advocate and our Judge (1 John 2:1; John 5:22).`,
    },
    resources: [R.ganeCult, R.gc24, R.gc28, R.seventy],
  },
}

export default function Service({ kind }: { kind: 'daily' | 'atonement' }) {
  const c = configs[kind]
  const [cur, setCur] = useState(0)
  const [playing, setPlaying] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setCur(0)
    setPlaying(false)
  }, [kind])

  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(() => {
      if (cur < c.steps.length - 1) setCur(cur + 1)
      else setPlaying(false)
    }, 4200)
    return () => window.clearTimeout(t)
  }, [playing, cur, c.steps.length])

  const pts = c.steps.slice(0, cur + 1).map((s) => s.at!).filter(Boolean)
  const step = c.steps[cur]

  return (
    <>
      <Stage caption={`Step ${cur + 1} of ${c.steps.length}: ${step.title}`}>
        <div className="home-plan">
        <Plan
          route={pts.length > 1 ? pts : undefined}
          routeKey={`${kind}-${cur}`}
          routeColor={c.colour}
          markers={c.steps.map((s, i) => ({ at: s.at!, label: s.title, active: i === cur }))}
          onSelect={(id) => navigate(`/symbol/${id}`)}
        />
        </div>
        <div className="stage-title">
          <span className="st-name">{c.title}</span>
        </div>
        <div className="stage-action step-controls">
          <button className="btn on-night" onClick={() => setCur(Math.max(0, cur - 1))} disabled={cur === 0} aria-label="Previous step">
            Back
          </button>
          <button
            className="btn on-night"
            onClick={() => {
              if (cur === c.steps.length - 1) setCur(0)
              setPlaying((p) => !p)
            }}
          >
            {playing ? 'Pause' : cur === c.steps.length - 1 ? 'Replay' : 'Play'}
          </button>
          <button className="btn on-night" onClick={() => setCur(Math.min(c.steps.length - 1, cur + 1))} disabled={cur === c.steps.length - 1} aria-label="Next step">
            Step
          </button>
        </div>
      </Stage>

      <div className="commentary">
        <div className="prose">
          <h1>{c.title}</h1>
          <p className="lede">{c.lede}</p>
          {c.intro.map((p, i) => (
            <p key={i}><Rich text={p} /></p>
          ))}
        </div>

        <ol className="steps prose">
          {c.steps.map((s, i) => (
            <li key={s.title} className={i === cur ? 'current' : ''} onClick={() => { setCur(i); setPlaying(false) }}>
              <h3>{s.title}</h3>
              <p><Rich text={s.text} /></p>
              <div className="refs">
                {s.verses.map((v) => (
                  <VerseRef key={v.ref} refText={v.ref} />
                ))}
              </div>
            </li>
          ))}
        </ol>

        <div className="callout prose">
          <h2>{c.closing.title}</h2>
          <p><Rich text={c.closing.text} /></p>
        </div>

        <h2>Key words</h2>
        <Terms terms={c.terms} />

        <h2>Further reading</h2>
        <Resources items={c.resources} />

        <Pager path={c.path} />
      </div>
    </>
  )
}
