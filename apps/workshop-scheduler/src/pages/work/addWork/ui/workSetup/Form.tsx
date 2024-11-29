import { useTranslation } from '@nexus-ui/i18n'
import { CheckboxFormField, InputTextFormField, SelectBoxFormField } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Fragment } from 'react'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'

import { DefaultWork, Qualifications } from '../../model/consts'
import { WorkSetupFormSchema } from '../../model/formSchema'

export interface FormProps {
  control: Control<WorkSetupFormSchema>
  errors: FieldErrors<WorkSetupFormSchema>
}

export const Form = ({ control, errors }: FormProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.workSetupForm.${key}`)

  const { fields, append, remove } = useFieldArray<WorkSetupFormSchema>({
    control,
    name: 'works',
  })

  const statuses = [
    {
      value: true,
      label: translate('active'),
    },
    {
      value: false,
      label: translate('inactive'),
    },
  ]

  //TODO: Add getting qualifications list from the api
  const qualifications = Qualifications.map((qualification) => ({
    value: qualification.id,
    label: qualification.label,
  }))

  return (
    <form className="flex flex-col">
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <InputTextFormField
                type="text"
                name={`works.${index}.name`}
                placeholder={translate('workName')}
                control={control}
                error={errors.works?.[index]?.name}
                className={{
                  input: 'w-full',
                  container: 'flex-grow',
                }}
              />
              {fields.length > 1 && (
                <Button
                  className="h-[40px]"
                  data-cy="remove-work-button"
                  type="button"
                  outlined
                  severity="secondary"
                  icon="pi pi-trash"
                  onClick={() => remove(index)}
                />
              )}
            </div>
            <SelectBoxFormField
              name={`works.${index}.qualificationId`}
              placeholder={translate('qualification')}
              options={qualifications}
              control={control}
              className={{
                input: 'w-full',
              }}
              error={errors.works?.[index]?.qualificationId}
            />
            <SelectBoxFormField
              name={`works.${index}.isActive`}
              placeholder={translate('status')}
              options={statuses}
              control={control}
              className={{
                input: 'w-full',
              }}
              error={errors.works?.[index]?.isActive}
            />
            <div className="flex gap-6">
              <CheckboxFormField
                name={`works.${index}.isDescriptionEditable`}
                label={translate('nameChangeable')}
                control={control}
                error={errors.works?.[index]?.isDescriptionEditable}
              />
              <CheckboxFormField
                name={`works.${index}.isCapacityEditable`}
                label={translate('capacityChangeable')}
                control={control}
                error={errors.works?.[index]?.isCapacityEditable}
              />
            </div>
          </div>
          <Divider className="my-8" />
        </Fragment>
      ))}

      <Button
        type="button"
        severity="secondary"
        outlined
        label={translate('addWorkButton')}
        onClick={() => append({ ...DefaultWork })}
        className="w-fit"
      />
      <Divider className="my-8" />
    </form>
  )
}
