import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { Outlet } from 'react-router-dom'

import AreaDetailCard from './AreaDetailCard'

export const AreaDetailPage = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.areas.areaDetail.${key}`)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[35px] leading-none">{translate('title')}</h1>

        <Button severity="secondary" outlined label={translate('EditAreaButton')} />
      </div>
      <AreaDetailCard />

      <Outlet />
    </div>
  )
}
