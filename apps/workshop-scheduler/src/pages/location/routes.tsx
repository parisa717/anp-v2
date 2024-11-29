import { redirect, RouteObject } from 'react-router-dom'

import { authRequiredLoader, IdParamSchema, pageUrls, ROUTE_PATHS, zodContract } from '@/shared/lib'

export const locationsRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.Location.Root,
    lazy: async () => {
      const { LocationsListPage } = await import('./locationsList/ui/Page')
      return { Component: LocationsListPage }
    },
    loader: authRequiredLoader,
  },
  {
    path: ROUTE_PATHS.Location.Details.Root,
    lazy: async () => {
      const { LocationDetailsPage } = await import('./locationDetails/ui/Page')
      return { Component: LocationDetailsPage }
    },
    loader: (args) => {
      const idParamContract = zodContract(IdParamSchema)

      if (!idParamContract.isData(args.params)) {
        // TODO: Add proper error handling
        return redirect(pageUrls.location.root())
      }

      return args
    },
    children: [
      {
        path: ROUTE_PATHS.Location.Details.LocationWorks.create,
        lazy: async () => {
          const { CreateLocationWorkPage } = await import('./locationDetails/ui/locationWorkTab/createLocationWork/ui')
          return { Component: CreateLocationWorkPage }
        },
        loader: (args) => {
          const idParamContract = zodContract(IdParamSchema)

          if (!idParamContract.isData(args.params)) {
            // TODO: Add proper error handling
            return redirect(pageUrls.location.root())
          }

          return args
        },
      },
    ],
  },
]
