import { DataTableDropdown, DataTableSearchInput } from '@nexus-ui/ui'
import { FilterMatchMode } from 'primereact/api'
import { ColumnProps } from 'primereact/column'

import {  LocationEntity } from '@/entities/location'
import { StatusCell } from '@/shared/ui'


export const useColumns = () => {
 

  const columns: ColumnProps[] = [
    {
      field: 'area.id',
      header: "Area-ID",
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
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
    },
    {
      field: 'name',
      header: "Standortname",
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'brands.name',
      filterMatchMode: FilterMatchMode.CUSTOM,
      header: "Marke",
      sortable: true,
      filter: true,
     
      showFilterMenu: false,
      showClearButton: false,
      
      pt: {
        headerCell: {
          className: 'min-w-64',
        },
      },
    },
    {
      field: 'address.postCode',
      header: "Postleitzahl",
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.city',
      header: "Stadt",
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.address',
      header: "Adresse",
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
        field: 'address.country.name',
        header: "Land",
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
        header: "Status",
        body: (location: LocationEntity) => <StatusCell data={location} />,
        sortable: true,
        filter: true,
        filterElement: DataTableDropdown({
          options: [
            {
              label: "Active",
              value: true,
            },
            {
              label: "inActive",
              value: false,
            },
          ],
          optionLabel: 'label',
          optionValue: 'value',
        }),
        showFilterMenu: false,
        showClearButton: false,
      },
  
  ]

  return columns
}
