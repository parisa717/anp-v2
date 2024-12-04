import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Outlet, useParams } from 'react-router-dom'

import {  GqlAreaObjectTypeEntity, useGetAreaQuery } from '@/entities/area'

import { useAreaColumns } from '../lib/useAreaColumns'

const dataTablePt = {
  root: {
    className: 'border border-bluegray-200 border-solid rounded bg-shade-000 p-3 mb-2',
  },
  table: {
    className: 'table-fixed',
  },
  column: {
    root: {
      className: 'bg-shade-000 border-0',
    },
    bodyCell: {
      className: 'text-text-base-text-xl-semibold-lineheight-150 text-bluegray-700 border-0 p-1',
    },
    headerCell: {
      className: 'p-1 pb-0',
    },
    headerTitle: {
      className: 'text-text-base-regular-lineheight-150 text-bluegray-500 border-0',
    },
  },
}

export const AreaDetailPage = () => {

  const { t } = useTranslation()
 
  const areaColumns = useAreaColumns()

  const { id = '' } = useParams<{ id: string }>()

  const { data: areaData, isLoading :isAreaDataLoading , isError:isErrorArea} = useGetAreaQuery({ id })

  if (isErrorArea) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const translate = (key: string) => t(`pages.areas.areaDetail.${key}`)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[35px] leading-none">{translate('title')}</h1>

        <Button severity="secondary" outlined label={translate('EditAreaButton')} />
      </div>
     <DataTable<GqlAreaObjectTypeEntity[]>
        columns={areaColumns}
        data={areaData ? [areaData] : []}
        loading={isAreaDataLoading}
        pt={{ ...dataTablePt, root: { ...dataTablePt.root, 'data-cy': 'area-table' } }}
        emptyMessage={translate('table.empty')}
      
      />

      <Outlet />
    </div>
  )
}
