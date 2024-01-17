import { TFunction } from 'i18next'
import { z } from 'zod'

const emailReq = 'errors.emailRequired'
const invalidEmail = 'errors.emailInvalid'

export type FormSchemaType = z.infer<ReturnType<typeof ForgotPasswordFormSchema>>

export const ForgotPasswordFormSchema = (t: TFunction<string, undefined>) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t(emailReq) })
      .email({ message: t(invalidEmail) }),
    recaptcha: z.string(),
  })
