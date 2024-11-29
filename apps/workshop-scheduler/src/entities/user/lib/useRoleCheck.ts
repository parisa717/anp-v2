import { useAppSelector } from '@/shared/model'

import { selectCurrentUser } from '../model/slice'
import { UserRole } from '../model/types'
import { hasRequiredUserRole } from './accessControl'

export const useRoleCheck = (requiredUserRole: UserRole) => {
  const currentUser = useAppSelector(selectCurrentUser)

  return currentUser ? hasRequiredUserRole(currentUser, requiredUserRole) : false
}
