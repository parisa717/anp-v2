import { GqlBusinessStatusObjectType as GeneratedBusinessStatusType } from '@/shared/api/types.generated'

import { GetBusinessStatusesByLocationQuery, GetBusinessStatusesQuery } from './BusinessStatus.generated'

/**
 * This is an example interface
 */

export type BusinessStatusDTO = GeneratedBusinessStatusType
export type QueryBusinessStatuses = GetBusinessStatusesQuery['getWorkshopAppointmentBusinessStatuses']
export type QueryBusinessStatusesByLocation =
  GetBusinessStatusesByLocationQuery['getLocationWorkshopAppointmentBusinessStatuses']
