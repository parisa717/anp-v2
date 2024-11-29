import { RouteObject } from 'react-router-dom'

import { Home } from '@/pages/home'

import { ROUTE_PATHS } from './routePaths'

export const routesConfig: RouteObject[] = [
  {
    path: ROUTE_PATHS.Root,
    Component: Home,
  },
]
