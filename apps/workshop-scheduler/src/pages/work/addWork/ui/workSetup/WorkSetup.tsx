import { useTranslation } from '@nexus-ui/i18n'
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useCreateWorkshopWorkMutation } from '@/entities/work'
import { pageUrls } from '@/shared/lib'

import { WorkSetupFormSchema } from '../../model/formSchema'
import { Footer } from './Footer'
import { Form } from './Form'

interface WorkSetupProps {
  control: Control<WorkSetupFormSchema>
  errors: FieldErrors<WorkSetupFormSchema>
  onNext: () => void
  handleSubmit: UseFormHandleSubmit<WorkSetupFormSchema>
}

export const WorkSetup = ({ control, errors, onNext, handleSubmit }: WorkSetupProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.${key}`)
  const [createWork, { isLoading, isError }] = useCreateWorkshopWorkMutation()

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const onSubmitHandler = async (data: WorkSetupFormSchema) => {
    await createWork({
      works: data.works.map((work) => ({
        name: work.name,
        qualification: { id: work.qualificationId },
        isDescriptionEditable: work.isDescriptionEditable,
        isCapacityEditable: work.isCapacityEditable,
        isActive: work.isActive,
        brands: [
          {
            id: 'mock_id',
            timeUnits: 1000,
          },
        ],
      })),
    })

    navigate(pageUrls.work.root())
  }

  const handleCancel = () => {
    navigate(pageUrls.work.root())
  }

  const handleSkipAndSave = () => {
    handleSubmit(onSubmitHandler)()
  }

  return (
    <div className="min-w-[480px]">
      <h2 className="text-text-3xl-semibold-lineheight-150 leading-text-3xl-semibold-lineheight-150 m-0 mb-8">
        {translate('defineWorkSetup')}
      </h2>
      <Form control={control} errors={errors} />
      <Footer isUpdating={isLoading} onCancel={handleCancel} onNext={onNext} onSkipAndSave={handleSkipAndSave} />
    </div>
  )
}
