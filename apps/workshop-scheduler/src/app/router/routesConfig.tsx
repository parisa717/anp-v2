import { RouteObject } from 'react-router-dom'

import { appointmentsRoutes } from '@/pages/appointments'
import { authRoutes } from '@/pages/auth'
import { businessStatusRoutes } from '@/pages/businessStatus'
import { businessStatusByLocationRoutes } from '@/pages/businessStatusByLocation'
import { colorsSetupRoutes } from '@/pages/colorSetup'
import { dashboardRoutes } from '@/pages/dashboard'
import { locationsRoutes } from '@/pages/location'
import { workRoutes } from '@/pages/work'
import { ROUTE_PATHS } from '@/shared/lib'
import { BaseLayout } from '@/widgets/baseLayout'

import { getRootRoute } from './getRootRoute'

export const routesConfig: RouteObject[] = [
  {
    path: ROUTE_PATHS.Root,
    Component: BaseLayout,
    children: [
      getRootRoute(),
      authRoutes,
      dashboardRoutes,
      appointmentsRoutes,
      businessStatusRoutes,
      businessStatusByLocationRoutes,
      ...locationsRoutes,
      ...colorsSetupRoutes,
      ...workRoutes,
    ],
  },
]
