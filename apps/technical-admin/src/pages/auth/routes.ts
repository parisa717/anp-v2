import { RouteObject } from 'react-router-dom'

import { authRedirectLoader, ROUTE_PATHS } from '@/shared/lib'

import { LoginPage } from './login/ui/Page'

export const authRoutes: RouteObject = {
  path: ROUTE_PATHS.Login,
  Component: LoginPage,
  loader: authRedirectLoader,
}
