import { Link, useLocation } from 'react-router-dom'
import { neighbours, sections } from '../data/order'

function Arrow({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" strokeWidth="1.2" opacity="0.6" />
      {dir === 'prev' ? <path d="M23 12 L15 20 L23 28" /> : <path d="M17 12 L25 20 L17 28" />}
    </svg>
  )
}

export default function Stage({ children, caption }: { children: React.ReactNode; caption?: string }) {
  const { pathname } = useLocation()
  const { prev, next, index } = neighbours(pathname)
  return (
    <section className="stage" aria-label="Illustration">
      <div className="stage-inner">{children}</div>
      {prev && (
        <Link className="stage-arrow prev" to={prev.path} aria-label={`Previous: ${prev.title}`}>
          <Arrow dir="prev" />
          <span className="peek">{prev.title}</span>
        </Link>
      )}
      {next && (
        <Link className="stage-arrow next" to={next.path} aria-label={`Next: ${next.title}`}>
          <Arrow dir="next" />
          <span className="peek">{next.title}</span>
        </Link>
      )}
      {caption && <div className="stage-caption">{caption}</div>}
      {index >= 0 && <div className="stage-progress">{index + 1} of {sections.length}</div>}
    </section>
  )
}
