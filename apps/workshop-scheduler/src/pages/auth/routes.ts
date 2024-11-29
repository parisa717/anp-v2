import { RouteObject } from 'react-router-dom'

import { authRedirectLoader, ROUTE_PATHS } from '@/shared/lib'

export const authRoutes: RouteObject = {
  path: ROUTE_PATHS.Login,
  lazy: async () => {
    const { LoginPage } = await import('./login/ui/Page')
    return { Component: LoginPage }
  },
  loader: authRedirectLoader,
}
