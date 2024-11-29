import './translations'

import { Providers } from './providers'
import { Router } from './router'

function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  )
}

export default App
