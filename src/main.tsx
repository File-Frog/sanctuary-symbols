import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/marcellus/400.css'
import '@fontsource/spectral/400.css'
import '@fontsource/spectral/400-italic.css'
import '@fontsource/spectral/500.css'
import '@fontsource/spectral/600.css'
import '@fontsource/frank-ruhl-libre/hebrew-500.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
