import { DataTable } from '@nexus-ui/ui'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import { LocationEntity, useGetLocationsQuery } from '@/entities/location'

import { useColumns } from '../lib/useColumns'

export const LocationsListPage = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.locations.locationsList.${key}`)

  const { data: locations, isLoading, isError } = useGetLocationsQuery()
  const columns = useColumns()

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }
  <h1 className="text-headline">{translate('title')}</h1>

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>

      <DataTable<LocationEntity[]>
        removableSort
        columns={columns}
        data={locations || []}
        loading={isLoading}
        emptyMessage={translate('table.empty')}
        filterDisplay="row"
        pt={{
          column: {
            sortIcon: {
              className: 'text-theme-primary',
            },
          },
        }}
      />

      <Outlet />
    </main>
  )
}
