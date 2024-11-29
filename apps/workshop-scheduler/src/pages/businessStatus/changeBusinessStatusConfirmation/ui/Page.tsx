import { useTranslation } from '@nexus-ui/i18n'
import { ConfirmationModal } from '@nexus-ui/ui'
import { useGetUrlSearchParamsFromSchema } from '@nexus-ui/utils'
import { useNavigate, useParams } from 'react-router-dom'

import {
  useActivateAdditionalBusinessStatusMutation,
  useDeactivateAdditionalBusinessStatusMutation,
} from '@/entities/additionalBusinessStatus'
import {
  changeBusinessStatusSearchParams,
  useActivateBusinessStatusMutation,
  useDeactivateBusinessStatusMutation,
} from '@/entities/businessStatus'
import { IdParam, pageUrls } from '@/shared/lib'

export const ChangeBusinessStatusConfirmationPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { id } = useParams<IdParam>()

  const [activateBusinessStatus, { isLoading: isActivatingBusinessStatus }] = useActivateBusinessStatusMutation()
  const [deactivateBusinessStatus, { isLoading: isDeactivatingBusinessStatus }] = useDeactivateBusinessStatusMutation()
  const [activateAdditionalBusinessStatus, { isLoading: isActivatingAdditionalBusinessStatus }] =
    useActivateAdditionalBusinessStatusMutation()
  const [deactivateAdditionalBusinessStatus, { isLoading: isDeactivatingAdditionalBusinessStatus }] =
    useDeactivateAdditionalBusinessStatusMutation()

  const { type, isAdditionalBusinessStatus } = useGetUrlSearchParamsFromSchema(changeBusinessStatusSearchParams)

  const translate = (key: string) => t(`pages.businessStatus.changeBusinessStatusConfirmation.${key}`)

  const onSubmitHandler = async () => {
    if (id) {
      const isAdditional = isAdditionalBusinessStatus === 'true'
      const actions = {
        activate: isAdditional ? activateAdditionalBusinessStatus : activateBusinessStatus,
        deactivate: isAdditional ? deactivateAdditionalBusinessStatus : deactivateBusinessStatus,
      }

      const selectedAction = actions[type]

      await selectedAction({ id })
      navigate(pageUrls.businessStatus.root())
    }
  }

  const handleCancelClick = () => {
    navigate(pageUrls.businessStatus.root())
  }

  return (
    <ConfirmationModal
      minWidth={564}
      width="30%"
      title={translate('title')}
      onCancelClick={handleCancelClick}
      onSaveClick={onSubmitHandler}
      isUpdating={
        isActivatingBusinessStatus ||
        isDeactivatingBusinessStatus ||
        isActivatingAdditionalBusinessStatus ||
        isDeactivatingAdditionalBusinessStatus
      }
    >
      <p className="text-center font-semibold text-bluegray-700">{translate('description')}</p>
    </ConfirmationModal>
  )
}
