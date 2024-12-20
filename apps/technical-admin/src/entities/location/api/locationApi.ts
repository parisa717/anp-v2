import type { ApiWithTransformResponse } from '@/shared/api'

import { api } from './Location.generated'

type LocationApi = ApiWithTransformResponse<typeof api, [], Record<string, unknown>>
type TagTypes = LocationApi['TagTypes']
type ApiEndpointDefinitions = LocationApi['ApiEndpointDefinitions']

export const locationApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {},
})

export const { useCreateLocationMutation } = locationApi
