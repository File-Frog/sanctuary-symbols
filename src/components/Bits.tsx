import { Link } from 'react-router-dom'
import type { Resource, Term } from '../data/symbols'
import { neighbours } from '../data/order'
import { Rich } from './Scripture'

export function Terms({ terms }: { terms: Term[] }) {
  return (
    <div className="terms">
      {terms.map((t) => (
        <div className="term" key={t.translit}>
          <div className="term-head">
            <span className={`term-word${t.lang === 'Greek' ? ' greek' : ''}`} lang={t.lang === 'Greek' ? 'grc' : 'he'}>
              {t.word}
            </span>
            <span className="term-translit">{t.translit}</span>
            <span className="term-lang">{t.lang}</span>
          </div>
          <p><Rich text={t.meaning} /></p>
        </div>
      ))}
    </div>
  )
}

export function Resources({ items }: { items: Resource[] }) {
  return (
    <ul className="res-list">
      {items.map((r) => (
        <li key={r.title}>
          <a href={r.url} target="_blank" rel="noreferrer">
            <strong>{r.title}</strong>
            <span>{r.detail}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Pager({ path }: { path: string }) {
  const { prev, next } = neighbours(path)
  return (
    <nav className="pager" aria-label="Continue the study">
      {prev && (
        <Link to={prev.path}>
          <span className="pg-dir">Previous</span>
          <span className="pg-title">{prev.title}</span>
        </Link>
      )}
      {next && (
        <Link to={next.path} className="next">
          <span className="pg-dir">Next</span>
          <span className="pg-title">{next.title}</span>
        </Link>
      )}
    </nav>
  )
}

export function Paras({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p, i) => (
        <p key={i}><Rich text={p} /></p>
      ))}
    </>
  )
}
