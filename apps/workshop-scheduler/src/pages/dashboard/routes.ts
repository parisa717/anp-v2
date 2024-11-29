import { RouteObject } from 'react-router-dom'

import { authRequiredLoader, ROUTE_PATHS } from '@/shared/lib'

export const dashboardRoutes: RouteObject = {
  path: ROUTE_PATHS.Root,
  lazy: async () => {
    const { DashboardPage } = await import('./ui/Page')
    return { Component: DashboardPage }
  },
  loader: authRequiredLoader,
}
