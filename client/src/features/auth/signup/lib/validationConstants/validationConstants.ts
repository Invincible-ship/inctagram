import { TFunction } from 'i18next'
import { z } from 'zod'

const userNameRequired = 'validate.userNameRequired'
const userNameMinLength = 'validate.userNameMinLength'
const userNameMaxLength = 'validate.userNameMaxLength'
const userNameCanContain = 'validate.userNameCanContain'
const emailInvalid = 'validate.emailInvalid'
const emailRequired = 'validate.emailRequired'
const passwordRequired = 'validate.passwordRequired'
const passwordMinLength = 'validate.passwordMinLength'
const passwordMaxLength = 'validate.passwordMaxLength'
const passwordConfirmationRequired = 'validate.passwordConfirmationRequired'
const passwordsDoNotMatch = 'validate.passwordsDoNotMatch'
const passwordMustContain = 'validate.passwordMustContain'

export type FormSchemaType = z.infer<ReturnType<typeof formSchema>>

export const formSchema = (t: TFunction<string, undefined>) =>
  z
    .object({
      userName: z
        .string()
        .min(1, { message: t(userNameRequired) })
        .min(6, { message: t(userNameMinLength) })
        .max(30, { message: t(userNameMaxLength) })
        .regex(/^[a-zA-Z0-9_-]*$/, t(userNameCanContain))
        .trim(),
      email: z
        .string()
        .min(1, { message: t(emailRequired) })
        .email({ message: t(emailInvalid) }),
      password: z
        .string()
        .min(1, { message: t(passwordRequired) })
        .min(6, { message: t(passwordMinLength) })
        .max(20, { message: t(passwordMaxLength) })
        .regex(
          // eslint-disable-next-line max-len
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+$/,
          {
            message: t(passwordMustContain),
          },
        ),
      passwordConfirmation: z.string().min(1, { message: t(passwordConfirmationRequired) }),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      path: ['passwordConfirmation'],
      message: t(passwordsDoNotMatch),
    })
