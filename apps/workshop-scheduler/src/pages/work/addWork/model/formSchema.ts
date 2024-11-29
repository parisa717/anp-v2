import { TFunction } from 'i18next'
import { z } from 'zod'

export const workSetupFormSchema = (t: TFunction) =>
  z.object({
    works: z.array(
      z.object({
        name: z.string().min(3, t('validation.required')),
        qualificationId: z.string().min(1, t('validation.required')),
        isActive: z.boolean(),
        isDescriptionEditable: z.boolean(),
        isCapacityEditable: z.boolean(),
      }),
    ),
  })

export type WorkSetupFormSchema = z.infer<ReturnType<typeof workSetupFormSchema>>
