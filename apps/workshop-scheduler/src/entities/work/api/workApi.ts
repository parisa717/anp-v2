import { cacher } from '@nexus-ui/utils'

import { type ApiWithTransformResponse } from '@/shared/api'

import { api, CreateWorkshopWorkMutation } from './Work.generated'

type WorkApi = ApiWithTransformResponse<
  typeof api,
  ['CreateWorkshopWork'],
  {
    CreateWorkshopWork: CreateWorkshopWorkMutation
  }
>
type TagTypes = WorkApi['TagTypes']
type ApiEndpointDefinitions = WorkApi['ApiEndpointDefinitions']

const WORK_TAG = 'WORK'

export const workApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, WORK_TAG],
  endpoints: {
    CreateWorkshopWork: {
      invalidatesTags: cacher.invalidatesList(WORK_TAG),
    },
  },
})

export const { useCreateWorkshopWorkMutation } = workApi
