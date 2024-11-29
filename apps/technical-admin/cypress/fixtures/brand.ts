import { QueryBrand, QueryBrands } from '@/entities/brand/api/types'

export const GET_BRANDS_OPERATION_DEFAULT_RESPONSE: QueryBrands = [
  {
    id: 'brand_1',
    code: 'Opel',
    isActive: true,
  },
  {
    id: 'brand_2',
    code: 'Kia',
    isActive: false,
  },
  {
    id: 'brand_3',
    code: 'Nissan',
    isActive: true,
  },
]

export const CREATE_BRAND_OPERATION_DEFAULT_RESPONSE: QueryBrand = {
  id: 'mocked_brand_1',
  code: 'Kia',
  isActive: false,
}

export const GET_BRAND_OPERATION_DEFAULT_RESPONSE: QueryBrand = {
  id: 'mocked_brand_1',
  code: 'Kia',
  isActive: false,
}

export const UPDATE_BRAND_OPERATION_DEFAULT_RESPONSE: QueryBrand = {
  id: 'mocked_brand_1',
  code: 'Kia updated name',
  isActive: true,
}
