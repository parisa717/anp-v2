import { TFunction } from 'i18next'

import { pageUrls } from '@/shared/lib'

export const getAdminUserMenu = (t: TFunction) => {
  return [
    {
      label: t('widgets.baseLayout.menuItems.mainMenu'),
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
      label: t('widgets.baseLayout.menuItems.settings'),
      items: [
        {
          label: t('widgets.baseLayout.menuItems.statusAndOverbookingConfiguration'),
          icon: 'pi pi-bookmark',
          url: pageUrls.businessStatusByLocation.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.counterConfiguration'),
          icon: 'pi pi-clock',
          url: pageUrls.appointments.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.serviceAdvisorConfiguration'),
          icon: 'pi pi-calendar',
          url: pageUrls.appointments.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.teamConfiguration'),
          icon: 'pi pi-users',
          url: pageUrls.appointments.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.userConfiguration'),
          icon: 'pi pi-user',
          url: pageUrls.appointments.root(),
        },
      ],
    },
  ]
}
