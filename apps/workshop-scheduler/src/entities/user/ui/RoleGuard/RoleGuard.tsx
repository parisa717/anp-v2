import { ReactNode } from 'react'

import { useAppSelector } from '@/shared/model'

import { hasRequiredUserRole } from '../../lib/accessControl'
import { selectCurrentUser } from '../../model/slice'
import { UserRole } from '../../model/types'

interface RoleGuardProps {
  requiredUserRole: UserRole
  children: ReactNode
}

export const RoleGuard = ({ requiredUserRole, children }: RoleGuardProps) => {
  const currentUser = useAppSelector(selectCurrentUser)

  if (!currentUser || !hasRequiredUserRole(currentUser, requiredUserRole)) {
    return null
  }

  return <>{children}</>
}
