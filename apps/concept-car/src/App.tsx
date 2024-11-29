import './App.css'

import { Providers } from './components/providers'
import { Router } from './router'

export const App = () => {
  return (
    <Providers>
      <Router />
    </Providers>
  )
}

export default App
