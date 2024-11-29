import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Message } from 'primereact/message'
import { Outlet } from 'react-router-dom'

import { useGetLocationsQuery } from '@/entities/location'

import { useColumns } from '../lib/useColumns'

export const LocationsListPage = () => {
  const { t } = useTranslation()
  const { data: locations, isLoading, isError } = useGetLocationsQuery()
  const columns = useColumns()

  const translate = (key: string) => t(`pages.location.locationsList.${key}`)

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>

      <Message severity="info" text={translate('message')} className="mb-7 w-full justify-start" />

      <DataTable
        removableSort
        columns={columns}
        data={locations ?? []}
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
