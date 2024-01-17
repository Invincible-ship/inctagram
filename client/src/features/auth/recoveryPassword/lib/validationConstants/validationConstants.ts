import { TFunction } from 'i18next'
import { z } from 'zod'

const passwordMinLength = 'errors.passwordMinLength'
const passwordMaxLength = 'errors.passwordMaxLength'
const passwordMustContain = 'errors.passwordMustContain'
const passwordsDoNotMatch = 'errors.passwordsDoNotMatch'

const regex = /^(?=.*[A-Za-z])(?=.*[! "#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/

export type FormSchemaType = z.infer<ReturnType<typeof formCreatePasswordSchema>>

export const formCreatePasswordSchema = (t: TFunction<string, undefined>) =>
  z
    .object({
      password: z
        .string()
        .min(6, t(passwordMinLength))
        .max(20, t(passwordMaxLength))
        .regex(regex, {
          message: t(passwordMustContain),
        }),
      confirmPassword: z.string(),
    })
    .refine(data => data.confirmPassword === data.password, {
      message: t(passwordsDoNotMatch),
      path: ['confirmPassword'],
    })
