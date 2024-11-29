import { type ApiWithTransformResponse } from '@/shared/api'

import { transformBrand } from '../lib/transformBrand'
import { transformBrands } from '../lib/transformBrands'
import { type BrandEntity } from '../model/types'
import { api, GetBrandQuery, GetBrandsQuery } from './Brand.generated'

type BrandApi = ApiWithTransformResponse<
  typeof api,
  ['GetBrands', 'GetBrand'],
  { GetBrands: BrandEntity[]; GetBrand: BrandEntity | null }
>
type TagTypes = BrandApi['TagTypes']
type ApiEndpointDefinitions = BrandApi['ApiEndpointDefinitions']

export const brandApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetBrands: {
      transformResponse: (response: GetBrandsQuery) => transformBrands(response.getBrands.data),
    },
    GetBrand: {
      transformResponse: (response: GetBrandQuery) => transformBrand(response.getBrand),
    },
  },
})

export const { useCreateBrandMutation, useUpdateBrandMutation, useGetBrandQuery, useGetBrandsQuery } = brandApi
