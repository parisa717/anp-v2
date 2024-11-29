import { TFunction } from 'i18next'
import { MenuItem } from 'primereact/menuitem'

import { pageUrls } from '@/shared/lib'

export const getMenuItems = (t: TFunction): MenuItem[] => {
  return [
    {
      label: t('main menu'),
      items: [
        {
          label: t('widgets.baseLayout.menuItems.areas'),
          icon: 'pi pi-building',
          url: pageUrls.root,
        },
        {
          label: t('widgets.baseLayout.menuItems.locations'),
          icon: 'pi pi-map-marker',
          url: pageUrls.root,
        },
        {
          label: t('widgets.baseLayout.menuItems.brands'),
          icon: 'pi pi-car',
          url: pageUrls.brands.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.user'),
          icon: 'pi pi-users',
          url: pageUrls.root,
        },
      ],
    },
  ]
}
