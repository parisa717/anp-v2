import { TFunction } from 'i18next'

import { pageUrls } from '@/shared/lib'

export const getReadOnlyUserMenu = (t: TFunction) => {
  return [
    {
      label: t('navigation.mainMenu'),
      items: [
        {
          label: t('widgets.baseLayout.menuItems.dashboard'),
          icon: 'pi pi-th-large',
          url: pageUrls.root,
        },
        {
          label: t('widgets.baseLayout.menuItems.appointments'),
          icon: 'pi pi-list',
          url: pageUrls.appointments.root(),
        },
      ],
    },
  ]
}
