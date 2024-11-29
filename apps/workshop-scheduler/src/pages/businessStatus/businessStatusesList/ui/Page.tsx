import { useTranslation } from '@nexus-ui/i18n'
import { Outlet } from 'react-router-dom'

import { ROUTE_PATHS } from '@/shared/lib'
import { OperationMessagesList } from '@/shared/ui'
import { BusinessStatusMode, StatusDataSection } from '@/widgets/StatusDataSection'

const MESSAGES_URL = ROUTE_PATHS.BusinessStatus.Root

export const BusinessStatusesListPage = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.businessStatus.businessStatusList.${key}`)

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>

      <OperationMessagesList className="my-9" page={MESSAGES_URL} />

      <section className="flex flex-row gap-4">
        <StatusDataSection isAdditionalBusinessStatus={false} mode={BusinessStatusMode.Default} />
        <StatusDataSection isAdditionalBusinessStatus mode={BusinessStatusMode.Default} />
      </section>

      <Outlet />
    </main>
  )
}
