import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { neighbours, topicFor, topics, type Topic } from '../data/order'

function TopicNav({ topic, open, onToggle, onNavigate }: { topic: Topic; open: boolean; onToggle: () => void; onNavigate: () => void }) {
  const reduce = useReducedMotion()
  let step = 0
  const id = `topic-${topic.id}`
  return (
    <div className={`topic${open ? ' open' : ''}`}>
      <button className="topic-btn" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span className="topic-title">{topic.title}</span>
        <svg className="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="topic-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.32, ease: [0.4, 0, 0.2, 1] }}
          >
            {topic.groups.map((g, gi) => (
              <div className="nav-group" key={gi}>
                {g.heading && (
                  <div className="nav-heading">
                    {g.colour && <span className="swatch" style={{ background: g.colour }} />}
                    {g.heading}
                    {g.note && <span className="phase">{g.note}</span>}
                  </div>
                )}
                {g.items.map((it) => (
                  <NavLink key={it.path} to={it.path} end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={onNavigate}>
                    {g.numbered && <span className="step">{++step}</span>}
                    <span>{it.title}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Nav({ onNavigate }: { onNavigate: () => void }) {
  const { pathname } = useLocation()
  const current = topicFor(pathname)?.id
  const [openIds, setOpenIds] = useState<string[]>(current ? [current] : [])
  useEffect(() => {
    if (current) setOpenIds((ids) => (ids.includes(current) ? ids : [...ids, current]))
  }, [current])
  return (
    <nav aria-label="Topics">
      <div className="nav-label">Topics</div>
      {topics.map((t) => (
        <TopicNav
          key={t.id}
          topic={t}
          open={openIds.includes(t.id)}
          onToggle={() => setOpenIds((ids) => (ids.includes(t.id) ? ids.filter((x) => x !== t.id) : [...ids, t.id]))}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  )
}

export default function Layout() {
  const outlet = useOutlet()
  const location = useLocation()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)

  // Symbol pages share one mounted view so the camera can glide between them.
  const groupKey = location.pathname.startsWith('/sanctuary/symbol/') ? '/sanctuary/symbol' : location.pathname

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    setOpen(false)
  }, [location.pathname, reduce])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, select, [contenteditable]') || e.altKey || e.metaKey || e.ctrlKey) return
      const { prev, next } = neighbours(location.pathname)
      if (e.key === 'ArrowRight' && next) navigate(next.path)
      if (e.key === 'ArrowLeft' && prev) navigate(prev.path)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [location.pathname, navigate])

  return (
    <div className="shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <div className="brand-title">Bible Studies</div>
        </NavLink>
        <button className="menu-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="side">
          Contents
        </button>
      </header>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside id="side" className={`side${open ? ' open' : ''}`}>
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <div className="brand-title">Bible Studies</div>
          <div className="brand-sub">Interactive studies in Scripture</div>
        </NavLink>
        <Nav onNavigate={() => setOpen(false)} />
        <p className="side-foot">Use the arrows on the picture, or ← → on your keyboard, to move through a topic.</p>
      </aside>
      <main className="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={groupKey}
            className="page-fade"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: 'easeInOut' }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
