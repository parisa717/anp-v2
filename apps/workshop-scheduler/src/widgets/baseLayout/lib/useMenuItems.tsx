import { useTranslation } from '@nexus-ui/i18n'
import { MenuItem } from 'primereact/menuitem'
import { useNavigate } from 'react-router-dom'

import { getMenuForUserRole } from './getMenuForUserRole'
import { useGetCurrentUser } from './useGetCurrentUser'

export const useMenuItems = (): MenuItem[] => {
  const { t } = useTranslation()
  const { currentUserRole } = useGetCurrentUser()

  const navigate = useNavigate()

  if (currentUserRole) {
    const processMenuItem = (menuItem: MenuItem) => {
      const processedItem = {
        ...menuItem,
        url: undefined,
        command: () => menuItem.url && navigate(menuItem.url),
      }

      if (menuItem.items && Array.isArray(menuItem.items)) {
        processedItem.items = menuItem.items.map(processMenuItem)
      }

      return processedItem
    }

    return getMenuForUserRole(currentUserRole, t).map(processMenuItem)
  }

  return []
}
