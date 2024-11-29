import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal, InputTextFormField } from '@nexus-ui/ui'
import { Checkbox } from 'primereact/checkbox'
import { RadioButton } from 'primereact/radiobutton'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import {
  useEditAdditionalBusinessStatusMutation,
  useGetAdditionalBusinessStatusQuery,
} from '@/entities/additionalBusinessStatus'
import { useEditBusinessStatusMutation, useGetBusinessStatusQuery } from '@/entities/businessStatus'
import { pageUrls } from '@/shared/lib'

import { EditBusinessStatusFormSchema, editBusinessStatusFormSchema } from '../model/formSchema'

const FORM_ID = 'editBusinessStatusForm'

type EditBusinessStatusPageProps = {
  isAdditionalBusinessStatus: boolean
}

export const EditBusinessStatusPage = ({ isAdditionalBusinessStatus }: EditBusinessStatusPageProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { id = '' } = useParams<{ id: string }>()

  const {
    data: businessStatus,
    isSuccess: isSuccessGetBusinessStatus,
    isError: isErrorGetBusinessStatus,
    isLoading: isLoadingGetBusinessStatus,
  } = useGetBusinessStatusQuery(
    { id },
    {
      skip: isAdditionalBusinessStatus,
    },
  )
  const {
    data: additionalBusinessStatus,
    isSuccess: isSuccessGetAdditionalBusinessStatus,
    isError: isErrorGetAdditionalBusinessStatus,
    isLoading: isLoadingGetAdditionalBusinessStatus,
  } = useGetAdditionalBusinessStatusQuery(
    { id },
    {
      skip: !isAdditionalBusinessStatus,
    },
  )
  const [editBusinessStatus, { isLoading: isUpdatingEditBusinessStatus }] = useEditBusinessStatusMutation()
  const [editAdditionalBusinessStatus, { isLoading: isUpdatingEditAdditionalBusinessStatus }] =
    useEditAdditionalBusinessStatusMutation()

  const initialValues = isAdditionalBusinessStatus ? additionalBusinessStatus : businessStatus

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<EditBusinessStatusFormSchema>({
    resolver: zodResolver(editBusinessStatusFormSchema(t, isAdditionalBusinessStatus)),
    values: initialValues,
    defaultValues: {
      name: '',
      isDefault: false,
      isHighlighted: false,
    },
  })

  const isInitiallyDefault = initialValues?.isDefault

  const translate = (key: string) => t(`pages.businessStatus.createAndEditBusinessStatusForm.${key}`)

  const onSubmitHandler = async (data: EditBusinessStatusFormSchema) => {
    //TODO: Add error handling

    if (isAdditionalBusinessStatus) {
      await editAdditionalBusinessStatus({
        additionalBusinessStatus: { ...data, isHighlighted: data.isHighlighted ?? false, id },
      })
    }

    if (!isAdditionalBusinessStatus) {
      await editBusinessStatus({ businessStatus: { ...data, id } })
    }

    navigate(pageUrls.businessStatus.root())
  }

  const handleCancelClick = () => {
    navigate(pageUrls.businessStatus.root())
  }

  if (isErrorGetAdditionalBusinessStatus || isErrorGetBusinessStatus) {
    //TODO: Add error handling
    return 'Error while fetching data'
  }

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      formId={FORM_ID}
      width="28%"
      minWidth={624}
      title={translate('editTitle')}
      isUpdating={isUpdatingEditBusinessStatus || isUpdatingEditAdditionalBusinessStatus}
      isLoading={isLoadingGetBusinessStatus || isLoadingGetAdditionalBusinessStatus}
    >
      {(isSuccessGetBusinessStatus || isSuccessGetAdditionalBusinessStatus) && (
        <form className="flex flex-col mt-6" id={FORM_ID} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col gap-4">
            <InputTextFormField
              name="name"
              label={translate('form.fields.name')}
              hasFloatLabel
              control={control}
              className={{ input: 'w-full' }}
              error={errors.name}
            />
            <div className="flex flex-row items-center justify-between">
              <Controller
                name="isDefault"
                control={control}
                render={({ field: controllerField }) => (
                  <div className="flex items-center gap-3">
                    <RadioButton
                      name="isDefault"
                      pt={{
                        input: {
                          onClick: () => {
                            controllerField.onChange(!controllerField.value)
                          },
                        },
                      }}
                      checked={controllerField.value}
                      disabled={isInitiallyDefault}
                    />
                    <label htmlFor="isDefault">{translate('form.fields.isDefault')}</label>
                  </div>
                )}
              />
              {isAdditionalBusinessStatus && (
                <Controller
                  name="isHighlighted"
                  control={control}
                  render={({ field: controllerField }) => (
                    <div className="flex items-center gap-3">
                      <Checkbox
                        name="isHighlighted"
                        onChange={(e) => controllerField.onChange(e.checked)}
                        checked={!!controllerField.value}
                      />
                      <label htmlFor="isHighlighted">{translate('form.fields.isHighlighted')}</label>
                    </div>
                  )}
                />
              )}
            </div>
          </div>
        </form>
      )}
    </FormModal>
  )
}
