import { UserRole } from '../model/types'

export const USER_ROLE_TO_LEVEL_MAPPING: Record<UserRole, number> = {
  [UserRole.ReadOnly]: 10,
  [UserRole.RegularUser]: 20,
  [UserRole.RegularPlusUser]: 30,
  [UserRole.AdminUser]: 40,
  [UserRole.AvagUser]: 50,
}
