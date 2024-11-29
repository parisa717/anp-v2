import { FormModal } from '@nexus-ui/ui'
import { useNavigate, useParams } from 'react-router-dom'

import { IdParam, pageUrls } from '@/shared/lib'

export const CreateLocationWorkPage = () => {
  const navigate = useNavigate()
  const { id = '' } = useParams<IdParam>()

  const handleCancelClick = () => {
    navigate(pageUrls.location.details.root(id))
  }

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      formId={''}
      width="36%"
      minWidth={695}
      title={''}
      isUpdating={false}
      isLoading={false}
    ></FormModal>
  )
}
