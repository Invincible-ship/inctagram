import { InputField } from '@/shared/ui/InputField/InputField'
import { Button } from '@/shared/ui/Button/Button'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormSchemaType } from '@/features/auth/forgotPassword/lib/validationConstants/validationConstants'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import s from '../forgotPassword.module.scss'

type Props = {
  t: TFunction<Namespaces, undefined>
  email: string
  errors: FieldErrors<FormSchemaType>
  isValid: boolean
  register: UseFormRegister<FormSchemaType>
  isLoading: boolean
}
export const ForgotPasswordForm = (props: Props) => {
  const { t, isLoading, register, errors, email, isValid } = props
  return (
    <>
      <InputField
        className={s.input}
        register={register('email')}
        id={'forgot-password'}
        type={'email'}
        placeholder={'Epam@epam.com'}
        title={t('email')}
        error={errors.email}
        data-testid="email-input"
      />
      <div className={s.text}>{t('emailInstructions')}</div>
      {email && <div className={s.textAgain}>{t('linkAgain')}</div>}
      <Button
        isLoading={isLoading}
        disabled={!isValid || isLoading}
        className={'styled-btn styled-btn-1'}
        type={'submit'}
      >
        {email ? t('sendLinkAgain') : t('sendLink')}
      </Button>
    </>
  )
}
