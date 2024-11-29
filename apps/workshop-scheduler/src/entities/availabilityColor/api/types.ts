import { GqlAvailabilityColorObjectType as GeneratedAvailabilityColorType } from '@/shared/api/types.generated'

import { GetAvailabilityColorsQuery } from './AvailabilityColor.generated'

/**
 * This is an example interface
 */

export type AvailabilityColorDTO = GeneratedAvailabilityColorType
export type QueryAvailabilityColors = GetAvailabilityColorsQuery['getAvailabilityColors']
