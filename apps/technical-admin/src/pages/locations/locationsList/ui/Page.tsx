import { DataTable } from '@nexus-ui/ui'
import { Outlet } from 'react-router-dom'

import { LocationEntity, useGetLocationsQuery } from '@/entities/location'

import { useColumns } from '../lib/useColumns'

export const LocationsListPage = () => {
  const { data: locations, isLoading, isError } = useGetLocationsQuery()
  const columns = useColumns()

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  return (
    <main>
      <h1 className="text-headline">Standorte</h1>

      <DataTable<LocationEntity[]>
        removableSort
        columns={columns}
        data={locations || []}
        loading={isLoading}
        emptyMessage={'empty'}
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