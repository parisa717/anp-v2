import { RouteObject } from 'react-router-dom'

import { authRequiredLoader, ROUTE_PATHS } from '@/shared/lib'

export const workRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.Work.Root,
    lazy: async () => {
      const { WorkPage } = await import('./list/ui/Page')
      return { Component: WorkPage }
    },
    loader: authRequiredLoader,
  },
  {
    path: ROUTE_PATHS.Work.Add,
    lazy: async () => {
      const { AddWorkPage } = await import('./addWork/ui/Page')
      return { Component: AddWorkPage }
    },
    loader: authRequiredLoader,
  },
]
