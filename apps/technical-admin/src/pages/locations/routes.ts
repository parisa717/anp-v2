import { RouteObject } from 'react-router-dom'

import { authRequiredLoader, ROUTE_PATHS } from '@/shared/lib'

import { CreateLocationPage } from './createLocation/ui/Page'

export const locationsRoutes: RouteObject = {
  path: ROUTE_PATHS.Locations.Root,
  Component: null,
  loader: authRequiredLoader,
  children: [
    {
      path: ROUTE_PATHS.Locations.Create,
      Component: CreateLocationPage,
    },
  ],
}
