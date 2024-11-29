import { RouteObject } from 'react-router-dom'

import { AreasListPage } from '@/pages/areas'
import { authRequiredLoader } from '@/shared/lib'

export const getRootRoute = (): RouteObject => {
  return {
    path: '/',
    Component: AreasListPage,
    loader: authRequiredLoader,
  }
}
