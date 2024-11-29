import { GqlGetAdditionalBusinessStatusesObjectType as GeneratedAdditionalBusinessStatusType } from '@/shared/api/types.generated'

import { GetAdditionalBusinessStatusesQuery } from './AdditionalBusinessStatus.generated'

export type AdditionalBusinessStatusDTO = GeneratedAdditionalBusinessStatusType
export type QueryAdditionalBusinessStatuses =
  GetAdditionalBusinessStatusesQuery['getWorkshopAppointmentAdditionalBusinessStatuses']
