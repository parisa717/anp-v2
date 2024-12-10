import { DataTableDropdown, DataTableMultiSelect, DataTableSearchInput } from '@nexus-ui/ui'
import { FilterMatchMode, FilterService } from 'primereact/api'
import { Button } from 'primereact/button'
import { ColumnProps } from 'primereact/column'
import { Link } from 'react-router-dom'

import { useGetBrandsQuery } from '@/entities/brand'
import { BrandsTagsCellTemplate, LocationEntity } from '@/entities/location'
import { pageUrls } from '@/shared/lib'
import { StatusCell } from '@/shared/ui'


FilterService.register('custom_brands', (brands: LocationEntity['brands'], filterValue: string[]) => {
    if (!filterValue || !brands) return true
    if (filterValue.length === 0) return true
    return brands.some(({ id }) => filterValue.includes(id))
  })


export const useColumns = () => {
    const { data: brands, isError, isLoading } = useGetBrandsQuery()

    if (isError) {
      //TODO: Add proper error handling
      console.error('Error fetching brands')
    }
  const linkTemplate = (entity: LocationEntity) => {
    return (
      <Link to={pageUrls.locations.edit(entity.id)}>
        <Button
          link
          label={'Bearbeiten'}
          className="capitalize text-theme-primary"
          icon="pi pi-pencil"
          text
          iconPos="right"
        />
      </Link>
    )
  }
  const columns: ColumnProps[] = [
    {
      field: 'area.id',
      header: 'Area-ID',
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
      pt: {
        bodyCell: {
          className: 'text-center ',
        },
      },
    },
    {
      field: 'id',
      header: 'Standort-ID',
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
      pt: {
        bodyCell: {
          className: 'text-center ',
        },
      },
    },
    {
      field: 'name',
      header: 'Standortname',
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
        field: 'brands',
        filterMatchMode: FilterMatchMode.CUSTOM,
        header: "Marke",
        sortable: true,
        filter: true,
        filterElement: DataTableMultiSelect({
          options: brands,
          loading: isLoading,
          optionLabel: 'code',
          optionValue: 'id',
          maxSelectedLabels: 1,
        }),
        showFilterMenu: false,
        showClearButton: false,
        body: BrandsTagsCellTemplate,
        pt: {
          headerCell: {
            className: 'min-w-64',
          },
        },
    },
    {
      field: 'address.postCode',
      header: 'Postleitzahl',
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.city',
      header: 'Stadt',
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.address',
      header: 'Adresse',
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.country.name',
      header: 'Land',
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'isActive',
      filterMatchMode: FilterMatchMode.EQUALS,
      header: 'Status',
      body: (location: LocationEntity) => <StatusCell data={location} />,
      sortable: true,
      filter: true,
      filterElement: DataTableDropdown({
        options: [
          {
            label: 'Active',
            value: true,
          },
          {
            label: 'inActive',
            value: false,
          },
        ],
        optionLabel: 'label',
        optionValue: 'value',
      }),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      body: linkTemplate,
      pt: {
        bodyCell: {
          className: 'text-end ',
        },
      },
    },
  ]

  return columns
}
