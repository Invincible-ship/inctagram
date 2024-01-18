import ReCAPTCHA from 'react-google-recaptcha'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import s from './ReCaptcha.module.scss'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { forwardRef, memo } from 'react'
import { FormSchemaType } from '@/features/auth/forgotPassword/lib/validationConstants/validationConstants'
import { HStack } from '@/shared/ui/Stack'

const reCaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string

type Props = {
  theme?: 'dark' | 'light'
  t: TFunction<Namespaces, undefined>
  control: Control<FormSchemaType>
  errors?: FieldErrors<FormSchemaType>
}
export const ReCaptcha = memo(
  forwardRef<ReCAPTCHA, Props>((props, ref) => {
    const { control, t, theme, errors } = props
    const error = errors && errors.recaptcha
    const captchaBlock = error ? s.error : ''
    return (
      <HStack justify="center">
        <div className={captchaBlock}>
          <Controller
            control={control}
            name={'recaptcha'}
            render={({ field }) => (
              <ReCAPTCHA
                className={s.captcha}
                {...field}
                ref={ref}
                hl={t('lng')}
                theme={theme}
                sitekey={reCaptchaSiteKey}
              />
            )}
          />
          {error && <div className={s.errorText}>{t('notARobot')}</div>}
        </div>
      </HStack>
    )
  }),
)
