import { z } from 'zod';

const userNameRequired = 'validate.userNameRequired';
const userNameMaxLength = 'validate.userNameMaxLength';
const emailInvalid = 'validate.emailInvalid';
const emailRequired = 'validate.emailRequired';
const passwordRequired = 'validate.passwordRequired';
const passwordMinLength = 'validate.passwordMinLength';
const passwordMaxLength = 'validate.passwordMaxLength';
const passwordConfirmationRequired = 'validate.passwordConfirmationRequired';
const passwordsDoNotMatch = 'validate.passwordsDoNotMatch';

export type FormSchemaType = z.infer<typeof formSchema>;

export const formSchema = t =>
  z
    .object({
      userName: z
        .string()
        .min(6, { message: t(userNameRequired) })
        .max(30, { message: t(userNameMaxLength) }),
      email: z
        .string()
        .email({ message: t(emailInvalid) })
        .min(1, { message: t(emailRequired) }),
      password: z
        .string()
        .min(1, { message: t(passwordRequired) })
        .min(6, { message: t(passwordMinLength) })
        .max(20, { message: t(passwordMaxLength) }),
      passwordConfirmation: z
        .string()
        .min(1, { message: t(passwordConfirmationRequired) }),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      path: ['passwordConfirmation'],
      message: t(passwordsDoNotMatch),
    });
