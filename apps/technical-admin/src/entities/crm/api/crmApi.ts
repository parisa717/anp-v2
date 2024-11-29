import { type ApiWithTransformResponse } from '@/shared/api'

import { transformCrm } from '../lib/transformCrm'
import { type CrmEntity } from '../model/types'
import { api, GetCrmsQuery } from './Crm.generated'

type CrmApi = ApiWithTransformResponse<typeof api, ['GetCrms'], { GetCrms: CrmEntity[] }>
type TagTypes = CrmApi['TagTypes']
type ApiEndpointDefinitions = CrmApi['ApiEndpointDefinitions']

export const crmApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetCrms: {
      transformResponse: (response: GetCrmsQuery) => transformCrm(response.crms),
    },
  },
})

export const { useGetCrmsQuery } = crmApi
