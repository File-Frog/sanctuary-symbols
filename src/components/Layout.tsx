import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { symbols, zones, type Zone } from '../data/symbols'
import { neighbours } from '../data/order'

const zoneColour: Record<Zone, string> = { court: 'var(--court)', holy: 'var(--holy)', most: 'var(--most)' }

function Nav({ onNavigate }: { onNavigate: () => void }) {
  let step = 0
  const link = (to: string, label: string, n?: number) => (
    <NavLink key={to} to={to} end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={onNavigate}>
      {n !== undefined && <span className="step">{n}</span>}
      <span>{label}</span>
    </NavLink>
  )
  return (
    <nav aria-label="Study contents">
      <div className="nav-group">{link('/', 'Overview')}</div>
      {(Object.keys(zones) as Zone[]).map((z) => (
        <div className="nav-group" key={z}>
          <div className="nav-heading">
            <span className="swatch" style={{ background: zoneColour[z] }} />
            {zones[z].name}
            <span className="phase">{zones[z].phase}</span>
          </div>
          {symbols.filter((s) => s.zone === z).map((s) => link(`/symbol/${s.id}`, s.name, ++step))}
        </div>
      ))}
      <div className="nav-group">
        <div className="nav-heading">The services</div>
        {link('/services/daily', 'The Daily Service')}
        {link('/services/atonement', 'The Day of Atonement')}
        {link('/feasts', 'The Feasts')}
        {link('/priest', 'The High Priest')}
      </div>
      <div className="nav-group">
        <div className="nav-heading">Prophecy</div>
        {link('/prophecy', 'The 2300 Days')}
      </div>
      <div className="nav-group">
        <div className="nav-heading">Study</div>
        {link('/scripture', 'Scripture Index')}
        {link('/quiz', 'Test Yourself')}
        {link('/resources', 'Resources')}
      </div>
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
  const groupKey = location.pathname.startsWith('/symbol/') ? '/symbol' : location.pathname

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
          <div className="brand-title">The Sanctuary</div>
        </NavLink>
        <button className="menu-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="side">
          Contents
        </button>
      </header>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside id="side" className={`side${open ? ' open' : ''}`}>
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <div className="brand-title">The Sanctuary</div>
          <div className="brand-sub">Thy way, O God, is in the sanctuary</div>
        </NavLink>
        <Nav onNavigate={() => setOpen(false)} />
        <p className="side-foot">Use the arrows on the picture, or ← → on your keyboard, to move through the study.</p>
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
