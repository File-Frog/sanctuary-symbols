import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SymbolPage from './pages/SymbolPage'
import Service from './pages/Service'
import Feasts from './pages/Feasts'
import Priest from './pages/Priest'
import Prophecy from './pages/Prophecy'
import Scripture from './pages/Scripture'
import Quiz from './pages/Quiz'
import ResourcesPage from './pages/ResourcesPage'

const OLD = ['/symbol/', '/services/', '/feasts', '/priest', '/prophecy', '/scripture', '/quiz', '/resources']
function LegacyRedirect() {
  const { pathname } = useLocation()
  // While this page fades out it re-renders at the new address; do nothing then.
  if (pathname.startsWith('/sanctuary')) return null
  const old = OLD.some((p) => pathname.startsWith(p))
  return <Navigate to={old ? `/sanctuary${pathname}` : '/sanctuary'} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/sanctuary" replace />} />
          <Route path="sanctuary">
            <Route index element={<Home />} />
            <Route path="symbol/:id" element={<SymbolPage />} />
            <Route path="services/daily" element={<Service kind="daily" />} />
            <Route path="services/atonement" element={<Service kind="atonement" />} />
            <Route path="feasts" element={<Feasts />} />
            <Route path="priest" element={<Priest />} />
            <Route path="prophecy" element={<Prophecy />} />
            <Route path="scripture" element={<Scripture />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="resources" element={<ResourcesPage />} />
          </Route>
          {/* Old links from before topics were added */}
          <Route path="symbol/:id" element={<LegacyRedirect />} />
          <Route path="*" element={<LegacyRedirect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
