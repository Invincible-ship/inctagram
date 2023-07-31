import { z } from 'zod';

const passwordRequired = 'validate.passwordRequired';
const passwordMinLength = 'validate.passwordMinLength';
const passwordMaxLength = 'validate.passwordMaxLength';
const passwordConfirmationRequired = 'validate.passwordConfirmationRequired';
const passwordsDoNotMatch = 'validate.passwordsDoNotMatch';

export type FormSchemaType = z.infer<typeof formSchema>;

export const formSchema = t =>
  z
    .object({
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
