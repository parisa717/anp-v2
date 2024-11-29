import { Area as GeneratedApiType, GqlAreaObjectType } from '@/shared/api/types.generated'

import { GetAreaQuery, GetAreasQuery } from './Area.generated'

/**
 * This is an example interface
 */

export type AreaDTO = GeneratedApiType
export type getAreaDTO = GqlAreaObjectType
export type QueryAreas = GetAreasQuery['areas']
export type QueryArea = GetAreaQuery['getArea']
