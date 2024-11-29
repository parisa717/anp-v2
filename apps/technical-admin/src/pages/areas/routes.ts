import { RouteObject } from 'react-router-dom'

import { authRequiredLoader, ROUTE_PATHS } from '@/shared/lib'

import { AreaDetailPage } from './areaDetail/ui/page'
import { AreasListPage } from './areasList/ui/Page'
import { CreateAreaPage } from './createArea/ui/Page'

export const areasRoutes: RouteObject = {
  path: ROUTE_PATHS.Areas.Root,
  Component: AreasListPage,
  loader: authRequiredLoader,
  children: [
    {
      path: ROUTE_PATHS.Areas.Create,
      Component: CreateAreaPage,
    },
  ],
}
export const areasDetailRoutes: RouteObject = {
  path: ROUTE_PATHS.Areas.Detail,
  Component: AreaDetailPage,
  loader: authRequiredLoader,
}
