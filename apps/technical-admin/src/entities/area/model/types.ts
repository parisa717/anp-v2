import { Area, GqlAreaObjectType } from '@/shared/api/types.generated'

export type AreaEntity = Area
export type GqlAreaObjectTypeEntity = GqlAreaObjectType

export enum AreaStatus {
  Active = 'active',
  Inactive = 'inactive',
}
