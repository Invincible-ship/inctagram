// resetPasswordForm.tsx
'use client'
import React, { FC, FormEventHandler, useState } from 'react'
import { PasswordWrapper } from '@/shared/ui/PasswordWrapper/PasswordWrapper'
import { Button } from '@/shared/ui/Button/Button'
import '@/shared/styles/variables/common/_form.scss'

export type resetPasswordFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
  t: (key: string) => string
  errors: Record<string, any>
  isLoading: boolean
  register: any
}

export const ResetPasswordForm: FC<resetPasswordFormProps> = ({
  onSubmit,
  t,
  errors,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <form className={'form-style'} onSubmit={onSubmit}>
      <PasswordWrapper
        id={'password'}
        placeholder={'******************'}
        type={showPassword ? 'text' : 'password'}
        title={t('inputTitleNewPassword')}
        register={register('password')}
        toggleShowPassword={toggleShowPassword}
        error={errors.password}
      />
      <PasswordWrapper
        id={'passwordConfirmation'}
        placeholder={'******************'}
        type={showConfirmPassword ? 'text' : 'password'}
        title={t('inputTitleConfirmPassword')}
        register={register('passwordConfirmation')}
        toggleShowPassword={toggleShowConfirmPassword}
        error={errors.passwordConfirmation}
      />
      <span className={'info b-title bt14  align-start semibold'}>{t('infoReset')}</span>
      <Button type="submit" className={'styled-btn styled-btn-1 reset-btn'}>
        {t('CreateNewPasswordReset')}
      </Button>
    </form>
  )
}
