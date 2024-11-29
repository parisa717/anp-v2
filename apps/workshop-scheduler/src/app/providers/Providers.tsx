import { PrimeReactProvider } from 'primereact/api'
import { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from '../store'

interface AppProvidersProps {
  readonly children: ReactNode
}

export const Providers = ({ children }: AppProvidersProps) => {
  return (
    <PrimeReactProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </PrimeReactProvider>
  )
}
