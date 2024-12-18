import { useTranslation } from '@nexus-ui/i18n'
import { AutoCompleteInputFormField, InputTextFormField } from '@nexus-ui/ui'
import { Control, FieldErrors } from 'react-hook-form'

import { useLoadCountries } from '../lib/useLoadCountries'
import { EditAreaFormSchema } from '../model/formSchema'

export interface EditAreaFormProps {
  control: Control<EditAreaFormSchema>
  errors: FieldErrors<EditAreaFormSchema>
}

export const EditAreaForm = ({ control, errors }: EditAreaFormProps) => {
  const { t } = useTranslation()

  const { translatedCountries, isLoading: areCountriesLoading } = useLoadCountries(t)


  return (
    <form className="mt-6 flex flex-col gap-6">
      <div className="flex gap-2">
        <InputTextFormField
          type="text"
          name="code"
          label={"Area-ID"}
          hasFloatLabel
          control={control}
          error={errors.code}
          className={{
            input: 'w-40',
          }}
        />
        <InputTextFormField
          type="text"
          name="name"
          label={"Area-Name"}
          hasFloatLabel
          control={control}
          error={errors.name}
          className={{
            input: 'w-full',
            container: 'flex-grow',
          }}
        />
      </div>
      <AutoCompleteInputFormField
        name="address.country.id"
        label={"Postleitzahl"}
        hasFloatLabel
        initialSuggestions={translatedCountries || []}
        control={control}
        error={errors.address?.country?.id}
        disabled={areCountriesLoading}
        className={{
          input: 'w-full',
        }}
      />
      <div className="flex gap-2">
        <InputTextFormField
          type="text"
          name="address.postCode"
          label={"Stadt"}
          hasFloatLabel
          control={control}
          error={errors.address?.postCode}
          className={{
            input: 'w-40',
          }}
        />
        <InputTextFormField
          type="text"
          name="address.city"
          label={"Adresse"}
          hasFloatLabel
          control={control}
          error={errors.address?.city}
          className={{
            input: 'w-full',
            container: 'flex-grow',
          }}
        />
      </div>
      <InputTextFormField
        type="text"
        name="address.address"
        label={"Land"}
        hasFloatLabel
        control={control}
        error={errors.address?.address}
        className={{
          input: 'w-full',
        }}
      />
     
    </form>
  )
}
