import { TFunction } from 'i18next'

import { pageUrls } from '@/shared/lib'

export const getAvagUserMenu = (t: TFunction) => {
  return [
    {
      label: t('widgets.baseLayout.menuItems.mainMenu'),
      items: [
        {
          label: t('widgets.baseLayout.menuItems.workToBeCarriedOut'),
          icon: 'pi pi-wrench',
          url: pageUrls.work.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.locationConfiguration'),
          icon: 'pi pi-map-marker',
          url: pageUrls.location.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.status'),
          icon: 'pi pi-bookmark',
          url: pageUrls.businessStatus.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.colorSetup'),
          icon: 'pi pi-palette',
          url: pageUrls.colorSetup.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.userConfiguration'),
          icon: 'pi pi-user',
          url: pageUrls.appointments.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.setupAlarmFunctionDepotList'),
          icon: 'pi pi-bell',
          url: pageUrls.appointments.root(),
        },
      ],
    },
  ]
}
