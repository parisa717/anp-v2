import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z.string().min(3, 'Should include more than 3 letters'),
  password: z.string().min(3, 'Should include more than 3 letters'),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
