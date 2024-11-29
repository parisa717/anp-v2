import { RouteObject } from 'react-router-dom'

import { authRequiredLoader, ROUTE_PATHS } from '@/shared/lib'

export const colorsSetupRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.ColorSetup.Root,
    lazy: async () => {
      const { ColorSetupListPage } = await import('./colorSetupList/ui/Page')
      return { Component: ColorSetupListPage }
    },
    loader: authRequiredLoader,
  },
  {
    path: ROUTE_PATHS.ColorSetup.Edit,
    lazy: async () => {
      const { EditColorSetupPage } = await import('./editColorSetup/ui/Page')
      return { Component: EditColorSetupPage }
    },
    loader: authRequiredLoader,
  },
]
