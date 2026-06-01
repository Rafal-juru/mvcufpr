import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

/*
  basename respects vite's `base` (see vite.config.ts) so the same build works
  whether the site is served from a subfolder (/mvcufpr/) or the domain root (/)
  on Plesk. import.meta.env.BASE_URL is replaced at build time.
*/
const basename = import.meta.env.BASE_URL

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
