import { useTranslation } from '@nexus-ui/i18n'
import { Tabs } from '@nexus-ui/ui'
import { TabViewTabChangeEvent } from 'primereact/tabview'
import { useSearchParams } from 'react-router-dom'

import { ConnectedLocationsTab } from '../connectedLocationsTab'
import { LocationOverbookingTab } from '../locationOverbookingTab'
import { LocationWorkTab } from '../locationWorkTab'

export const LocationDetailsTabs = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.location.locationDetails.${key}`)
  const [searchParams, setSearchParams] = useSearchParams()

  const handleTabChange = ({ index }: TabViewTabChangeEvent) => {
    setSearchParams(
      { tab: items[index].id },
      {
        replace: true,
      },
    )
  }

  const items = [
    {
      id: 'locationWork',
      header: translate('locationWork.title'),
      children: <LocationWorkTab />,
    },
    {
      id: 'locationOverbooking',
      header: translate('locationOverbooking.title'),
      children: <LocationOverbookingTab />,
    },
    {
      id: 'connectedLocations',
      header: translate('connectedLocations.title'),
      children: <ConnectedLocationsTab />,
    },
  ]

  const activeTabIndex =
    items.findIndex(({ id }) => id === searchParams.get('tab')) > -1
      ? items.findIndex(({ id }) => id === searchParams.get('tab'))
      : 0

  return <Tabs items={items} activeIndex={activeTabIndex} onTabChange={handleTabChange} />
}
