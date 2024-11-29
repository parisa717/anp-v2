import { TFunction } from 'i18next'

import { pageUrls } from '@/shared/lib'

export const getRegularPlusUserMenu = (t: TFunction) => {
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
    {
      separator: true,
    },
    {
      label: t('navigation.settings'),
      items: [
        {
          label: t('widgets.baseLayout.menuItems.serviceAdvisorConfiguration'),
          icon: 'pi pi-calendar',
          url: pageUrls.appointments.root(),
        },
      ],
    },
  ]
}
