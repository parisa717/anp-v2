import { Area } from '@/shared/api/types.generated'

import { GetAreaQuery } from '../api/Area.generated'

export type AreaEntity = Area
export type GqlAreaObjectTypeEntity = GetAreaQuery['getArea']

export enum AreaStatus {
  Active = 'active',
  Inactive = 'inactive',
}
