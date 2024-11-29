import { UserRole } from '@/entities/user'
import { QueryCurrentUser } from '@/entities/user/api/types'

export const GET_CURRENT_USER_OPERATION_DEFAULT_RESPONSE: QueryCurrentUser = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'john-doe',
  email: 'john.doe@avag.com',
  userRole: UserRole.AdminUser,
}
