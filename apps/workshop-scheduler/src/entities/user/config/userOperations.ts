import { Operation, UserRole } from '../model/types'

export const USER_OPERATIONS = {
  VIEW_DASHBOARD: { name: 'view_dashboard', requiredUserRole: UserRole.ReadOnly },
  CREATE_APPOINTMENT: { name: 'create_post', requiredUserRole: UserRole.AdminUser },
} satisfies Record<string, Operation>
