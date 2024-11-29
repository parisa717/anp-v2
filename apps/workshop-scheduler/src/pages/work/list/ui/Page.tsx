import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { Link, Outlet } from 'react-router-dom'

import { pageUrls } from '@/shared/lib'

export const WorkPage = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.${key}`)

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>
      <Link to={pageUrls.work.add()}>
        <Button severity="secondary" outlined label={translate('add.title')} />
      </Link>
      <Outlet />
    </main>
  )
}
