import { redirect, RouteObject } from 'react-router-dom'

import { changeBusinessStatusSearchParams } from '@/entities/businessStatus'
import {
  authRequiredLoader,
  getUrlSearchParamsFromRequest,
  IdParamSchema,
  pageUrls,
  ROUTE_PATHS,
  zodContract,
} from '@/shared/lib'

export const businessStatusRoutes: RouteObject = {
  path: ROUTE_PATHS.BusinessStatus.Root,
  lazy: async () => {
    const { BusinessStatusesListPage } = await import('./businessStatusesList/ui/Page')
    return { Component: BusinessStatusesListPage }
  },
  loader: authRequiredLoader,
  children: [
    {
      path: ROUTE_PATHS.BusinessStatus.Create,
      lazy: async () => {
        const { CreateBusinessStatusPage } = await import('./createBusinessStatus/ui/Page')
        return { element: <CreateBusinessStatusPage isAdditionalBusinessStatus={false} /> }
      },
    },
    {
      path: ROUTE_PATHS.BusinessStatus.CreateAdditional,
      lazy: async () => {
        const { CreateBusinessStatusPage } = await import('./createBusinessStatus/ui/Page')
        return { element: <CreateBusinessStatusPage isAdditionalBusinessStatus /> }
      },
    },
    {
      path: ROUTE_PATHS.BusinessStatus.Edit,
      lazy: async () => {
        const { EditBusinessStatusPage } = await import('./editBusinessStatus/ui/Page')
        return { element: <EditBusinessStatusPage isAdditionalBusinessStatus={false} /> }
      },
    },
    {
      path: ROUTE_PATHS.BusinessStatus.EditAdditional,
      lazy: async () => {
        const { EditBusinessStatusPage } = await import('./editBusinessStatus/ui/Page')
        return { element: <EditBusinessStatusPage isAdditionalBusinessStatus /> }
      },
    },
    {
      path: ROUTE_PATHS.BusinessStatus.UnselectDefault,
      lazy: async () => {
        const { UnselectDefaultBusinessStatusPage } = await import('./unselectDefaultBusinessStatus/ui/Page')
        return { element: <UnselectDefaultBusinessStatusPage isAdditionalBusinessStatus={false} /> }
      },
    },
    {
      path: ROUTE_PATHS.BusinessStatus.UnselectDefaultAdditional,
      lazy: async () => {
        const { UnselectDefaultBusinessStatusPage } = await import('./unselectDefaultBusinessStatus/ui/Page')
        return { element: <UnselectDefaultBusinessStatusPage isAdditionalBusinessStatus /> }
      },
    },
    {
      path: ROUTE_PATHS.BusinessStatus.ChangeStatusConfirmation,
      lazy: async () => {
        const { ChangeBusinessStatusConfirmationPage } = await import('./changeBusinessStatusConfirmation/ui/Page')
        return { Component: ChangeBusinessStatusConfirmationPage }
      },
      loader: (args) => {
        const searchParams = Object.fromEntries(getUrlSearchParamsFromRequest(args.request).entries())
        const idParamContract = zodContract(IdParamSchema)
        const searchParamsContract = zodContract(changeBusinessStatusSearchParams)

        if (!idParamContract.isData(args.params)) {
          // TODO: Add proper error handling
          return redirect(pageUrls.businessStatus.root())
        }

        if (!searchParamsContract.isData(searchParams)) {
          // TODO: Add proper error handling
          return redirect(pageUrls.businessStatus.root())
        }

        return args
      },
    },
  ],
}
