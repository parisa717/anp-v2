import { TFunction } from 'i18next'
import { z } from 'zod'

//TODO: replace string with uuid validation when the gateway is ready
export const createLocationFormSchema = (t: TFunction) =>
  z.object({
    areaId: z.string().min(1, t('validation.required')),
    copyNameFromArea: z.boolean().optional(),
    id: z.string().min(1, t('validation.required')),
    name: z.string().min(1, t('validation.required')),
    zipCode: z.string().min(1, t('validation.required')),
    city: z.string().min(1, t('validation.required')),
    address: z.string().min(1, t('validation.required')),
    brandIds: z
      .array(
        z.object({
          id: z
            .string({
              message: t('validation.required'),
            })
            .min(1, t('validation.required')),
        }),
      )
      .min(1, t('validation.required')),
    isActive: z.boolean(),
  })

export type CreateLocationFormSchema = z.infer<ReturnType<typeof createLocationFormSchema>>
