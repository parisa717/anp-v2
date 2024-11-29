import { USER_ROLE_TO_LEVEL_MAPPING } from '../../config/userRoleLevels'
import { Operation, User, UserRole } from '../../model/types'

export const hasRequiredUserRole = (user: User, requiredUserRole: UserRole) => {
  return USER_ROLE_TO_LEVEL_MAPPING[user.role] >= USER_ROLE_TO_LEVEL_MAPPING[requiredUserRole]
}

export const canPerformOperation = (user: User, operation: Operation) => {
  return hasRequiredUserRole(user, operation.requiredUserRole)
}
