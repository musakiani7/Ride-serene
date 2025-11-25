import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n' // Initialize i18next

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem' }}>Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
