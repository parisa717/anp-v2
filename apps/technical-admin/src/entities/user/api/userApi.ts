import { type ApiWithTransformResponse } from '@/shared/api'

import { transformUser } from '../lib/transformUser'
import { type UserEntity } from '../model/types'
import { api, GetCurrentUserQuery } from './GetCurrentUser.generated'

type UserApi = ApiWithTransformResponse<typeof api, ['GetCurrentUser'], { GetCurrentUser: UserEntity }>
type TagTypes = UserApi['TagTypes']
type ApiEndpointDefinitions = UserApi['ApiEndpointDefinitions']

export const userApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetCurrentUser: {
      transformResponse: (response: GetCurrentUserQuery) => transformUser(response.currentUser),
    },
  },
})

export const { useGetCurrentUserQuery } = userApi
