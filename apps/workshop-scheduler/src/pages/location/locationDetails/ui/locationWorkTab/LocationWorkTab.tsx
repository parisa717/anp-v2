import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { Link, Outlet, useParams } from 'react-router-dom'

import { useGetLocationWorksQuery } from '@/entities/locationWork'
import { IdParam, pageUrls } from '@/shared/lib'

export const LocationWorkTab = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams<IdParam>()

  useGetLocationWorksQuery({ locationId: '' })

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 data-cy="overbooking-setup-title" className="text-3xl-regular-lineheight-150 text-bluegray-700">
          {t('pages.location.locationDetails.locationWork.title')}
        </h2>
        <Link to={pageUrls.location.details.locationWorks.create(id)}>
          <Button
            label={t('pages.location.locationDetails.locationWork.buttons.createLocationWork')}
            severity="secondary"
            outlined
          />
        </Link>
      </div>
      <Outlet />
    </section>
  )
}
