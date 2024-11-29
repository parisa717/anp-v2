export enum UserRole {
  ReadOnly = 'READ_ONLY',
  RegularUser = 'REGULAR_USER',
  RegularPlusUser = 'REGULAR_PLUS_USER',
  AdminUser = 'ADMIN_USER',
  AvagUser = 'AVAG_USER',
}

export interface User {
  firstName: string
  lastName: string
  username: string
  email: string
  role: UserRole
}

export interface Operation {
  name: string
  requiredUserRole: UserRole
}
