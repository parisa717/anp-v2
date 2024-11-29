import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { StepperModal } from '@nexus-ui/ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { DefaultWork } from '../model/consts'
import { WorkSetupFormSchema, workSetupFormSchema } from '../model/formSchema'
import { WorkSetup } from './workSetup'

export const AddWorkPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.${key}`)

  const {
    formState: { errors },
    handleSubmit,
    control,
    trigger,
  } = useForm<WorkSetupFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(workSetupFormSchema(t)),
    defaultValues: {
      works: [
        {
          ...DefaultWork,
        },
      ],
    },
  })

  const handleStepClick = async (index: number) => {
    if (index > activeIndex) {
      const isValid = await trigger()

      if (isValid) {
        setActiveIndex(index)
      }
    } else {
      setActiveIndex(index)
    }
  }

  const formSteps = [
    {
      label: translate('defineWorkSetup'),
      content: (
        <WorkSetup control={control} errors={errors} onNext={() => handleStepClick(1)} handleSubmit={handleSubmit} />
      ),
      width: '50%',
    },
    { label: translate('assignLocations'), content: <div>Assign Locations Form</div>, width: '50%' },
  ]

  return (
    <StepperModal
      activeStepIndex={activeIndex}
      onStepperStepClick={handleStepClick}
      steps={formSteps}
      stepsTitle={translate('title')}
      minWidth={1000}
    />
  )
}
