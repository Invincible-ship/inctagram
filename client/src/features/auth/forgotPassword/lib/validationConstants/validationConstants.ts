import { z } from 'zod'
import { TFunction } from 'i18next'

const emailInvalid = 'validate.emailInvalid'
const emailRequired = 'validate.emailRequired'

export type FormSchemaType = z.infer<ReturnType<typeof formSchema>>

export const formSchema = (t: TFunction<string, undefined>) =>
  z.object({
    email: z
      .string()
      .email({ message: t(emailInvalid) })
      .min(1, { message: t(emailRequired) }),
  })
