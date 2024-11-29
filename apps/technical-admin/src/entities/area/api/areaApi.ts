import { type ApiWithTransformResponse } from '@/shared/api'

import { transformAreas } from '../lib/transformAreas'
import { type AreaEntity, type GqlAreaObjectTypeEntity } from '../model/types'
import { api, GetAreaQuery, GetAreasQuery } from './Area.generated'

type AreaApi = ApiWithTransformResponse<
  typeof api,
  ['GetAreas', 'GetArea'],
  { GetAreas: AreaEntity[]; GetArea: GqlAreaObjectTypeEntity | null }
>

type TagTypes = AreaApi['TagTypes']
type ApiEndpointDefinitions = AreaApi['ApiEndpointDefinitions']

export const areaApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetAreas: {
      transformResponse: (response: GetAreasQuery) => transformAreas(response.areas),
    },
    GetArea: {
      transformResponse: (response: GetAreaQuery) => response.getArea,
    },
  },
})

export const { useGetAreasQuery, useCreateAreaMutation, useGetAreaQuery } = areaApi
