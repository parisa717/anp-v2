import { cacher } from '@nexus-ui/utils'

import { type ApiWithTransformResponse } from '@/shared/api'

import { LocationWorksEntity } from '../model'
import { api, CreateLocationWorkMutation, GetLocationWorksQuery } from './LocationWork.generated'

type LocationWorkApi = ApiWithTransformResponse<
  typeof api,
  ['CreateLocationWork', 'GetLocationWorks'],
  {
    CreateLocationWork: CreateLocationWorkMutation
    GetLocationWorks: LocationWorksEntity
  }
>

type TagTypes = LocationWorkApi['TagTypes']
type ApiEndpointDefinitions = LocationWorkApi['ApiEndpointDefinitions']

const LOCATION_WORK_TAG = 'LOCATION_WORK'

export const locationWorkApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, LOCATION_WORK_TAG],
  endpoints: {
    CreateLocationWork: {},
    GetLocationWorks: {
      transformResponse: (response: GetLocationWorksQuery) => response.getLocationWorks,
      providesTags: (result, error, arg) => {
        return cacher.cacheByIdArg(LOCATION_WORK_TAG)(result, error, arg.locationId)
      },
    },
  },
})

export const { useCreateLocationWorkMutation, useGetLocationWorksQuery } = locationWorkApi
