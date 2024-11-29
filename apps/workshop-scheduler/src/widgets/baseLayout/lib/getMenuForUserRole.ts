import { TFunction } from 'i18next'
import { MenuItem } from 'primereact/menuitem'

import { UserRole } from '@/entities/user'

import { getAdminUserMenu } from '../config/adminUserMenu'
import { getAvagUserMenu } from '../config/avagUserMenu'
import { getReadOnlyUserMenu } from '../config/readOnlyUserMenu'
import { getRegularPlusUserMenu } from '../config/regularPlusUserMenu'
import { getRegularUserMenu } from '../config/regularUserMenu'

const getUserRoleToMenuMapping = (t: TFunction) => {
  return {
    [UserRole.ReadOnly]: getReadOnlyUserMenu(t),
    [UserRole.RegularUser]: getRegularUserMenu(t),
    [UserRole.RegularPlusUser]: getRegularPlusUserMenu(t),
    [UserRole.AdminUser]: getAdminUserMenu(t),
    [UserRole.AvagUser]: getAvagUserMenu(t),
  }
}

export const getMenuForUserRole = (userRole: UserRole, t: TFunction): MenuItem[] => {
  return getUserRoleToMenuMapping(t)[userRole] ?? []
}
