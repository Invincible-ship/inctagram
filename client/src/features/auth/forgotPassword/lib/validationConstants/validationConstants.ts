import { z } from 'zod';

const emailInvalid = 'validate.emailInvalid';
const emailRequired = 'validate.emailRequired';


export type FormSchemaType = z.infer<typeof formSchema>;

export const formSchema = t =>
  z
    .object({
      email: z
        .string()
        .email({ message: t(emailInvalid) })
        .min(1, { message: t(emailRequired) }),
    })

