import { selectIsLoggedIn } from '@/entities/session'
import { selectCurrentUserRole, useGetCurrentUserQuery } from '@/entities/user'
import { useAppSelector } from '@/shared/model'

export const useGetCurrentUser = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { data: currentUser, ...rest } = useGetCurrentUserQuery(undefined, {
    skip: !isLoggedIn,
  })
  const currentUserRole = useAppSelector(selectCurrentUserRole)

  const currentUserFullName = currentUser && `${currentUser.firstName} ${currentUser.lastName}`

  return {
    ...rest,
    currentUser,
    currentUserRole,
    currentUserFullName,
    isLoggedIn,
  }
}
