import { TFunction } from 'i18next'
import { z } from 'zod'

const emailReq = 'errors.emailRequired'
const passwordReq = 'errors.passwordRequired'
const invalidEmail = 'errors.emailInvalid'
const passwordMinLength = 'errors.passwordMinLength'
const passwordMaxLength = 'errors.passwordMaxLength'

export type FormSchemaType = z.infer<ReturnType<typeof formSchema>>

export const formSchema = (t: TFunction<string, undefined>) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t(emailReq) })
      .email({ message: t(invalidEmail) }),
    password: z
      .string()
      .min(1, { message: t(passwordReq) })
      .min(6, { message: t(passwordMinLength) })
      .max(20, { message: t(passwordMaxLength) }),
  })
