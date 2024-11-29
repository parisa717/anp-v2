import { type ApiWithTransformResponse } from '@/shared/api'

import { transformDms } from '../lib/transformDms'
import { type DmsEntity } from '../model/types'
import { api, GetDmssQuery } from './Dms.generated'

type DmsApi = ApiWithTransformResponse<typeof api, ['GetDmss'], { GetDmss: DmsEntity[] }>
type TagTypes = DmsApi['TagTypes']
type ApiEndpointDefinitions = DmsApi['ApiEndpointDefinitions']

export const dmsApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetDmss: {
      transformResponse: (response: GetDmssQuery) => transformDms(response.dmss),
    },
  },
})

export const { useGetDmssQuery } = dmsApi
