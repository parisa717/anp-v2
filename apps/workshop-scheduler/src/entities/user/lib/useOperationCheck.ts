import { useAppSelector } from '@/shared/model'

import { selectCurrentUser } from '../model/slice'
import { Operation } from '../model/types'
import { canPerformOperation } from './accessControl'

export const useOperationCheck = (operation: Operation) => {
  const currentUser = useAppSelector(selectCurrentUser)

  return currentUser ? canPerformOperation(currentUser, operation) : false
}
