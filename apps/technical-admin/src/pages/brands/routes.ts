import { RouteObject } from 'react-router-dom'

import { authRequiredLoader, ROUTE_PATHS } from '@/shared/lib'

import { BrandsListPage } from './brandsList/ui/Page'
import { CreateBrandPage } from './createBrand/ui/Page'
import { EditBrandPage } from './editBrand/ui/Page'

export const brandsRoutes: RouteObject = {
  path: ROUTE_PATHS.Brands.Root,
  Component: BrandsListPage,
  loader: authRequiredLoader,
  children: [
    {
      path: ROUTE_PATHS.Brands.Create,
      Component: CreateBrandPage,
    },
    {
      path: ROUTE_PATHS.Brands.Edit,
      Component: EditBrandPage,
    },
  ],
}
