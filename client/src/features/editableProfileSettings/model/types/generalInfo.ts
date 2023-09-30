import { TFunction } from 'i18next'
import { z } from 'zod'

// General Info schema and type
export const generalInfoSchemaFn = (t: TFunction<string, undefined>) =>
  z
    .object({
      userName: z
        .string()
        .min(6, t('general-info.errors.username.min'))
        .max(30, t('general-info.errors.username.max'))
        .regex(/^[A-Za-z0-9_;-]+$/, t('general-info.errors.username.symbols'))
        .trim(),
      firstName: z
        .string()
        .min(1, t('general-info.errors.firstName.min'))
        .max(50, t('general-info.errors.firstName.max'))
        .regex(/^[A-Za-zА-Яа-я]+$/, t('general-info.errors.firstName.symbols'))
        .trim(),
      lastName: z
        .string()
        .min(1, t('general-info.errors.lastName.min'))
        .max(50, t('general-info.errors.lastName.max'))
        .regex(/^[A-Za-zА-Яа-я]+$/, t('general-info.errors.lastName.symbols'))
        .trim(),
      birthday: z.date().min(new Date('01-01-1950Z')).min(new Date('01-01-2100Z')).optional(),
      city: z.string().optional(),
      aboutMe: z.string().max(200, t('general-info.errors.aboutMe.max')).optional(),
    })
    .refine(
      obj =>
        typeof obj.birthday != 'undefined' &&
        Date.now() - obj.birthday.getDate() > 13 * 365 * 24 * 60 * 60 * 1000,
      {
        path: ['birthday'],
        message: t('general-info.errors.birtday'),
      },
    )

export type TGeneralInfo = z.infer<ReturnType<typeof generalInfoSchemaFn>>
