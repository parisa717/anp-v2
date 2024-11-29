import { RouteObject } from 'react-router-dom'

import { authRequiredLoader, ROUTE_PATHS } from '@/shared/lib'

export const businessStatusByLocationRoutes: RouteObject = {
  path: ROUTE_PATHS.BusinessStatusByLocation.Root,
  lazy: async () => {
    const { BusinessStatusesByLocationListPage } = await import('./businessStatusesByLocationList/ui/Page')
    return { Component: BusinessStatusesByLocationListPage }
  },
  loader: authRequiredLoader,
  children: [
    {
      path: ROUTE_PATHS.BusinessStatusByLocation.Create,
      lazy: async () => {
        const { CreateBusinessStatusByLocationPage } = await import('./createBusinessStatusByLocation/ui/Page')
        return { element: <CreateBusinessStatusByLocationPage isAdditionalBusinessStatus={false} /> }
      },
    },
    {
      path: ROUTE_PATHS.BusinessStatusByLocation.CreateAdditional,
      lazy: async () => {
        const { CreateBusinessStatusByLocationPage } = await import('./createBusinessStatusByLocation/ui/Page')
        return {
          element: <CreateBusinessStatusByLocationPage isAdditionalBusinessStatus />,
        }
      },
    },
  ],
}
