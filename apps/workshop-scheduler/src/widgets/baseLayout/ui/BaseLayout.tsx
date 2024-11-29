import { Layout } from '@/shared/ui'

import { useGetCurrentUser } from '../lib/useGetCurrentUser'
import { useMenuItems } from '../lib/useMenuItems'
import { useSetCurrentLocation } from '../lib/useSetCurrentLocation'

export const BaseLayout = () => {
  const { isLoading, currentUserFullName, isLoggedIn } = useGetCurrentUser()
  const menuItems = useMenuItems()

  useSetCurrentLocation()

  if (isLoading) {
    return 'Loading...'
  }

  return <Layout menuItems={menuItems} userFullName={currentUserFullName ?? ''} isLoggedIn={isLoggedIn} />
}
