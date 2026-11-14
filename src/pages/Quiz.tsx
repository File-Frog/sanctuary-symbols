import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Plan from '../components/Plan'
import Stage from '../components/Stage'
import { Rich } from '../components/Scripture'
import { Pager } from '../components/Bits'
import { quiz } from '../data/extras'

const FOCUS = ['gate', 'altar', 'laver', 'table', 'lampstand', 'incense', 'veil', 'mercyseat', 'mercyseat', undefined, undefined, 'ark']

export default function Quiz() {
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const done = n >= quiz.length
  const q = quiz[Math.min(n, quiz.length - 1)]
  const score = answers.filter((a, i) => a === quiz[i].answer).length

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    setAnswers((a) => [...a, i])
  }
  const next = () => {
    setPicked(null)
    setN(n + 1)
  }
  const restart = () => {
    setN(0)
    setPicked(null)
    setAnswers([])
  }

  return (
    <>
      <Stage caption={done ? `You scored ${score} of ${quiz.length}` : `Question ${n + 1} of ${quiz.length}`}>
        <div className="home-plan"><Plan focus={done ? undefined : FOCUS[n]} /></div>
        <div className="stage-title">
          <span className="st-name">Test Yourself</span>
        </div>
      </Stage>

      <div className="commentary">
        <div className="quiz-card">
          <AnimatePresence mode="wait" initial={false}>
            {!done ? (
              <motion.div key={n} initial={{ opacity: 0, x: reduce ? 0 : 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduce ? 0 : -16 }} transition={{ duration: reduce ? 0 : 0.3 }}>
                <div className="quiz-meta">Question {n + 1} of {quiz.length}. Score so far: {score}</div>
                <h1 className="quiz-q">{q.q}</h1>
                <div className="quiz-opts">
                  {q.options.map((o, i) => {
                    const cls = picked === null ? '' : i === q.answer ? ' right' : i === picked ? ' wrong' : ''
                    return (
                      <button key={o} className={`quiz-opt${cls}`} onClick={() => choose(i)} disabled={picked !== null}>
                        {o}
                      </button>
                    )
                  })}
                </div>
                {picked !== null && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.3 }}>
                    <div className="quiz-explain">
                      <strong>{picked === q.answer ? 'Correct.' : 'Not quite.'}</strong> <Rich text={q.explain} />
                    </div>
                    <p style={{ marginTop: 18 }}>
                      <button className="btn" onClick={next} autoFocus>
                        {n === quiz.length - 1 ? 'See your score' : 'Next question'}
                      </button>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.4 }}>
                <h1>{score} of {quiz.length}</h1>
                <p className="lede">
                  {score === quiz.length ? 'Every one right.' : score >= 9 ? 'A strong grasp of the sanctuary.' : score >= 6 ? 'A good start. The pages below will fill the gaps.' : 'Worth walking through the sanctuary again.'}
                </p>
                {score < quiz.length && (
                  <>
                    <h2>Review</h2>
                    <ul className="item-list">
                      {quiz.map((x, i) =>
                        answers[i] === x.answer ? null : (
                          <li key={x.q}>
                            <strong style={{ fontFamily: 'var(--display)', fontWeight: 400 }}>{x.q}</strong>
                            <p>Answer: {x.options[x.answer]}. <Rich text={x.explain} /></p>
                            {FOCUS[i] && <p><Link to={`/symbol/${FOCUS[i]}`}>Study this again</Link></p>}
                          </li>
                        ),
                      )}
                    </ul>
                  </>
                )}
                <p style={{ marginTop: 24 }}>
                  <button className="btn" onClick={restart}>Take the quiz again</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Pager path="/quiz" />
      </div>
    </>
  )
}
