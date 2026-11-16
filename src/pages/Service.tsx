import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Plan from '../components/Plan'
import Stage from '../components/Stage'
import { Rich, VerseRef } from '../components/Scripture'
import { Pager, Paras, Resources, Terms } from '../components/Bits'
import { dailySteps, dailyTerms, yearlySteps, yearlyTerms, type Step } from '../data/extras'
import { R, type Para, type Resource, type Term } from '../data/symbols'

interface Config {
  path: string
  title: string
  lede: string
  intro: string[]
  steps: Step[]
  terms: Term[]
  colour: string
  meaning?: { title: string; paras: Para[] }
  closing: { title: string; text: string }
  resources: Resource[]
}

const configs: Record<'daily' | 'atonement', Config> = {
  daily: {
    path: '/sanctuary/services/daily',
    title: 'The Daily Service',
    lede: 'Forgiveness, every day of the year.',
    intro: [
      `Most of what happened at the sanctuary belonged to the daily service, which the Hebrew calls the tamid, the continual. It had two parts. The first was a lamb offered for the whole nation every morning and every evening. The second was the steady stream of personal offerings brought by individuals who had sinned. In both, the pattern was the same: a substitute died, and its blood was carried toward God.`,
      `Follow the steps below and watch the route on the plan. The blood travels inward from the court toward the holy place, and with it goes the record of sin.`,
    ],
    steps: dailySteps,
    terms: dailyTerms,
    colour: '#e26a2c',
    meaning: {
      title: 'Sin carried, forgiveness given',
      paras: [
        `The daily service taught Israel that forgiveness is never cheap. A sinner could not simply decide to feel sorry and move on. He had to bring a life, lean his weight on it, confess his sin aloud and take that life with his own hand. The act itself was his repentance, his confession and his faith, all at once. He was saying, "This is what my sin deserves, and I am trusting God to accept this substitute in my place."`,
        {
          quote: 'The repentant sinner brought his offering to the door of the tabernacle, and, placing his hand upon the victim\'s head, confessed his sins, thus in figure transferring them from himself to the innocent sacrifice.',
          by: 'Ellen White',
          source: 'Patriarchs and Prophets, p. 354',
        },
        `Every part of the service pointed to Christ. He is the Lamb without blemish, and "the LORD hath laid on him the iniquity of us all" (Isaiah 53:6). Paul says that God "hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him" (2 Corinthians 5:21). He is also the Priest. Just as the priest who ate the sin offering bore the people's iniquity, Christ, the Servant of Isaiah 53, "bare the sin of many, and made intercession for the transgressors" (Isaiah 53:12). He is both the sacrifice that dies and the priest who carries the sin away from the sinner.`,
        `The service also shows where the sin went. It did not simply vanish. The blood carried it into the sanctuary, onto the horns of the altar or before the veil, so that the sanctuary held a growing record of sins that God had forgiven. Jeremiah could even say that the sin of Judah was written "upon the horns of your altars" (Jeremiah 17:1). That record would remain until the Day of Atonement, when it was finally removed.`,
        {
          quote: 'There was thus a continual transfer of sins from the people to the offerings and through them to the sanctuary, through the year.',
          by: 'Uriah Smith',
          source: 'Looking Unto Jesus (1898)',
        },
        `Behind the personal offerings stood the tamid, the lamb offered morning and evening for the whole nation. M. L. Andreasen called that lamb "representative of the whole nation, a kind of summary of all offerings." It meant that Israel was never left uncovered. Even when no one had come to the altar, a lamb lay on it, and the fire never went out (Leviticus 6:13). Day and night the nation lived under the protection of a sacrifice.`,
        {
          quote: 'Every morning and evening a lamb of a year old was burned upon the altar, with its appropriate meat offering, thus symbolizing the daily consecration of the nation to Jehovah, and their constant dependence upon the atoning blood of Christ.',
          by: 'Ellen White',
          source: 'Patriarchs and Prophets, p. 352',
        },
        `The hours of that sacrifice became the hours of prayer. Daniel prayed three times a day with his window open toward Jerusalem (Daniel 6:10), and the apostles went up to the temple "at the hour of prayer, being the ninth hour" (Acts 3:1). The tamid still has a lesson for us. We need Christ's sacrifice every day, and we can come to God every morning and every evening, confident that His sacrifice covers us all day long. That daily ministry is what Daniel calls "the daily," and it is the work Christ carries on for us in the heavenly sanctuary.`,
      ],
    },
    closing: {
      title: 'Where this leaves us',
      text: `The sinner went home forgiven that same day (Leviticus 4:31). But the sin had been carried into the sanctuary, which now held a record of forgiven guilt. That record had to be dealt with eventually, and that is the subject of the Day of Atonement. In the same way, Christ's death secures full forgiveness the moment we confess, and His ministry in heaven carries the plan through to its end (Hebrews 7:25).`,
    },
    resources: [R.gane, R.andreasen, R.pp30, R.smith],
  },
  atonement: {
    path: '/sanctuary/services/atonement',
    title: 'The Day of Atonement',
    lede: 'The year\'s record of sin, removed.',
    intro: [
      `Everything in the daily service led up to one day in the seventh month. On Yom ha-Kippurim, the Day of Atonement, the high priest went into the most holy place, cleansed the sanctuary of the year's record of sin, and sent the scapegoat into the wilderness. Israel treated it as a day of judgment. It separated the loyal from the indifferent, and it ended with a clean camp.`,
      `Daniel 8:14, Daniel 7 and Hebrews 9 all point to a heavenly fulfilment of this day, which is why the 2,300-day prophecy is a sanctuary prophecy.`,
    ],
    steps: yearlySteps,
    terms: yearlyTerms,
    colour: '#f2c96b',
    meaning: {
      title: 'The judgment and the end of sin',
      paras: [
        `The daily service dealt with sin one person at a time, and it left the sanctuary carrying a growing record of forgiven sins. The Day of Atonement dealt with the whole record at once. It was the climax of Israel's year, and the people knew it.`,
        {
          quote: 'The tenth day of the seventh month was the day of atonement. It was regarded as more sacred than any other day in the yearly round of service.',
          by: 'Stephen Haskell',
          source: 'The Cross and Its Shadow (1914), ch. 29',
        },
        `Everything about the day pointed to Christ. The high priest laid aside his glorious robes and served in plain linen, as Christ laid aside His glory and took on our humanity (Philippians 2:7). He went in alone, with no one else in the tabernacle, as Christ alone makes atonement for us. And he went in with blood, because the cleansing of the sanctuary rests on the sacrifice. Even the final judgment stands on the cross. Christ "was once offered to bear the sins of many," and Hebrews adds, "unto them that look for him shall he appear the second time without sin unto salvation" (Hebrews 9:28). Like Israel waiting outside for the high priest to come out, God's people now wait for their High Priest to finish His work and appear.`,
        `For the people outside, the day called for 'innah nefesh, real heart-searching. Haskell observed that it was an individual work: the congregation was not accepted as a crowd, but person by person. Each Israelite was to confess every sin, put it away and trust the work the high priest was doing for him. Anyone who treated the day lightly was cut off, not because his sins were too great, but because he would not come to God on God's terms.`,
        `The two goats show the end of the story. The LORD's goat was slain, and its blood cleansed the sanctuary; that is Christ, whose blood alone atones. The second goat was never slain and atoned for nothing. When the sanctuary was clean, the sins were confessed over its head, and it was taken away into the wilderness, never to return. The one who started sin will finally carry the responsibility for it, and God's people will be free of it for ever.`,
        {
          quote: 'When the high priest, by virtue of the blood of the sin-offering, removed the sins from the sanctuary, he placed them upon the scape-goat. When Christ, by virtue of his own blood, removes the sins of his people from the heavenly sanctuary at the close of his ministration, he will place them upon Satan, who, in the execution of the judgment, must bear the final penalty.',
          by: 'Ellen White',
          source: 'The Great Controversy (1888), p. 422',
        },
        `For the believer, the judgment is good news. Zechariah saw it in a vision: Joshua the high priest stood before the Angel of the LORD in filthy garments, with Satan at his right hand to accuse him. But the LORD answered, "The LORD rebuke thee, O Satan," took away the filthy garments and said, "I have caused thine iniquity to pass from thee, and I will clothe thee with change of raiment" (Zechariah 3:2; Zechariah 3:4). Paul asks the same question with the same confidence: "Who shall lay any thing to the charge of God's elect? It is God that justifieth" (Romans 8:33).`,
        {
          quote: 'Not until the goat had thus been led away did the people regard themselves as freed from the burden of their sins.',
          by: 'Ellen White',
          source: 'Patriarchs and Prophets, p. 355',
        },
        `That is where the whole sanctuary leads. The prophecy of Daniel 8:14 promised that the sanctuary would be nitsdaq, cleansed and set right. When Christ finishes His work, the record of His people's sins will be gone, God's justice and mercy will both stand vindicated before the universe, and sin will never rise again (Nahum 1:9).`,
      ],
    },
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

  // Highlight the original-language words only on pages that have been rewritten with them.
  const hl = c.meaning ? c.terms : undefined
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
          onSelect={(id) => navigate(`/sanctuary/symbol/${id}`)}
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
            <p key={i}><Rich text={p} terms={hl} /></p>
          ))}
        </div>

        <ol className="steps prose">
          {c.steps.map((s, i) => (
            <li key={s.title} className={i === cur ? 'current' : ''} onClick={() => { setCur(i); setPlaying(false) }}>
              <h3>{s.title}</h3>
              <p><Rich text={s.text} terms={hl} /></p>
              <div className="refs">
                {s.verses.map((v) => (
                  <VerseRef key={v.ref} refText={v.ref} />
                ))}
              </div>
            </li>
          ))}
        </ol>

        {c.meaning && (
          <div className="prose">
            <h2>{c.meaning.title}</h2>
            <Paras items={c.meaning.paras} terms={hl} />
          </div>
        )}

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
