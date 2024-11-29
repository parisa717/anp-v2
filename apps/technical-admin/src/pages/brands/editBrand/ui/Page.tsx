import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal, InputTextFormField, SelectBoxFormField } from '@nexus-ui/ui'
import { capitalize } from '@nexus-ui/utils'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { BRAND_STATUSES, BrandStatus, useGetBrandQuery, useUpdateBrandMutation } from '@/entities/brand'
import { pageUrls } from '@/shared/lib'

import { EditBrandFormSchema, editBrandFormSchema } from '../model/formSchema'
import { ConfirmModal } from './ConfirmModal'

export const EditBrandPage = () => {
  const { t } = useTranslation()
  const translate = (key: string): string => t(`pages.brands.editBrand.${key}`)

  const TRANSLATED_BRANDS_STATUSES = BRAND_STATUSES.map((status) => ({
    value: status,
    label: capitalize(t(status)),
  }))

  const { id = '' } = useParams<{ id: string }>()
  const { data: brand, isLoading } = useGetBrandQuery({ id })

  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation()
  const navigate = useNavigate()

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<EditBrandFormSchema>({
    resolver: zodResolver(editBrandFormSchema(t)),
    defaultValues: {
      name: '',
      status: BrandStatus.Inactive,
    },
  })

  /**
   * defaultValues for react-hook-form are only set once when the component mounts
   *
   * So we have to use the approach with reset() + useEffect()
   */

  useEffect(() => {
    if (brand) {
      reset({
        name: brand.name,
        status: brand.isActive ? BrandStatus.Active : BrandStatus.Inactive,
      })
    }
  }, [brand, reset])

  const openConfirmModal = () => setIsConfirmModalOpen(true)

  const onSubmitHandler = async (data: EditBrandFormSchema) => {
    await updateBrand({ brand: { id: id, code: data.name, isActive: data.status === BrandStatus.Active } })
    navigate(pageUrls.brands.root())
  }

  const handleCancelClick = () => {
    navigate(pageUrls.brands.root())
  }

  const handleSaveClick = () => {
    /**
     * we still need to execute form validation
     * thus, we execute handleSubmit()
     */

    handleSubmit(openConfirmModal)()
  }

  const handleConfirmModalSaveClick = (): void => {
    handleSubmit(onSubmitHandler)()
    setIsConfirmModalOpen(false)
  }

  const handleConfirmModalCancelClick = (): void => {
    setIsConfirmModalOpen(false)
  }

  return (
    <>
      <FormModal
        key={id}
        onCancelClick={handleCancelClick}
        onSaveClick={handleSaveClick}
        width={464}
        title={translate('title')}
        isUpdating={isUpdating}
        isLoading={isLoading}
        notFound={!isLoading && !brand}
      >
        <form className="mt-6 flex flex-col gap-6">
          <InputTextFormField
            type="text"
            name="name"
            label={translate('form.fields.brandName')}
            hasFloatLabel
            control={control}
            error={errors.name}
            className={{
              input: 'w-full',
            }}
          />
          <SelectBoxFormField
            name="status"
            label={translate('form.fields.brandStatus')}
            hasFloatLabel
            options={TRANSLATED_BRANDS_STATUSES}
            control={control}
            className={{
              input: 'w-full',
            }}
            error={errors.status}
          />
        </form>
      </FormModal>
      <ConfirmModal
        visible={isConfirmModalOpen}
        onCancelClick={handleConfirmModalCancelClick}
        onConfirmClick={handleConfirmModalSaveClick}
      />
    </>
  )
}
