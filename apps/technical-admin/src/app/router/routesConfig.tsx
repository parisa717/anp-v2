import { RouteObject } from 'react-router-dom'

import {  areasRoutes } from '@/pages/areas'
import { authRoutes } from '@/pages/auth'
import { brandsRoutes } from '@/pages/brands'
import { locationsRoutes } from '@/pages/locations'
import { ROUTE_PATHS } from '@/shared/lib'
import { BaseLayout } from '@/widgets/baseLayout'

import { getRootRoute } from './getRootRoute'

export const routesConfig: RouteObject[] = [
  {
    path: ROUTE_PATHS.Root,
    Component: () => <BaseLayout />,
    children: [getRootRoute(), ...areasRoutes, brandsRoutes, authRoutes, locationsRoutes],
  },
]
