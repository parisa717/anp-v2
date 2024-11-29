import './index.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import App from './app/App'

const root = document.getElementById('root')

if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
