import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GameSearchApp from './GameSearchApp'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameSearchApp />
  </StrictMode>,
)
