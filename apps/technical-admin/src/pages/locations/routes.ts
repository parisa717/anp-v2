import { RouteObject } from 'react-router-dom'

import { authRequiredLoader, ROUTE_PATHS } from '@/shared/lib'

import { CreateLocationPage } from './createLocation/ui/Page'
import { LocationsListPage } from './locationsList/ui/Page'

export const locationsRoutes: RouteObject = {
  path: ROUTE_PATHS.Locations.Root,
  Component: LocationsListPage,
  loader: authRequiredLoader,
  children: [
    {
      path: ROUTE_PATHS.Locations.Create,
      Component: CreateLocationPage,
    },
  ],
}
