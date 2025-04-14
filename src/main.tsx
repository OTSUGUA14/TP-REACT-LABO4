import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Instrumentos from './components/Instrumentos.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Instrumentos></Instrumentos>
  </StrictMode>,
)
