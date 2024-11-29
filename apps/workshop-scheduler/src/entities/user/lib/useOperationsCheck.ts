import { useAppSelector } from '@/shared/model'

import { selectCurrentUser } from '../model/slice'
import { Operation } from '../model/types'
import { canPerformOperation } from './accessControl'

export const useOperationsCheck = (operations: Operation[]) => {
  const currentUser = useAppSelector(selectCurrentUser)

  return operations.reduce<Record<string, boolean>>((acc, operation) => {
    acc[operation.name] = currentUser ? canPerformOperation(currentUser, operation) : false
    return acc
  }, {})
}
