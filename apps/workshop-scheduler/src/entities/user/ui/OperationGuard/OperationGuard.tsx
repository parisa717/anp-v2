import { ReactNode } from 'react'

import { useAppSelector } from '@/shared/model'

import { canPerformOperation } from '../../lib/accessControl'
import { selectCurrentUser } from '../../model/slice'
import { Operation } from '../../model/types'

interface OperationGuardProps {
  operation: Operation
  children: ReactNode
}

export const OperationGuard = ({ operation, children }: OperationGuardProps) => {
  const currentUser = useAppSelector(selectCurrentUser)

  if (!currentUser || !canPerformOperation(currentUser, operation)) {
    return null
  }

  return <>{children}</>
}
