'use client'
import React, { FC, FormEventHandler, useState } from 'react'
import { InputField } from '@/shared/ui/InputField/InputField'
import { PasswordWrapper } from '@/shared/ui/PasswordWrapper/PasswordWrapper'
import { Button } from '@/shared/ui/Button/Button'
import '@/shared/styles/variables/common/_form.scss'
import cls from '../signup.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { LanguageIds } from '@/shared/config/i18n/types'
import { AgreeBlock } from '@/features/auth/signup/ui/agreeBlock/AgreeBlock'

export type SignUpFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
  isLoading: boolean
  t: (key: string) => string
  errors: Record<string, any>
  register: any
  lngId: LanguageIds
  isValid: boolean
  setCheckedAgree: (checkedAgree: boolean) => void
  checkedAgree: boolean
}

export const SignUpForm: FC<SignUpFormProps> = ({
  onSubmit,
  t,
  errors,
  register,
  isLoading,
  lngId,
  isValid,
  setCheckedAgree,
  checkedAgree,
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
    <form onSubmit={onSubmit} className={classNames('form-style', {}, [cls.form])}>
      <InputField
        id={'userName'}
        type={'text'}
        placeholder={t('userName')}
        title={t('userName')}
        register={register('userName')}
        error={errors.userName}
        data-testid="username-input"
      />
      <InputField
        id={'email'}
        type={'text'}
        placeholder={t('email')}
        title={t('email')}
        register={register('email')}
        error={errors.email}
        data-testid="email-input"
      />
      <PasswordWrapper
        id={'password'}
        placeholder={t('password')}
        type={showPassword ? 'text' : 'password'}
        title={t('password')}
        register={register('password')}
        toggleShowPassword={toggleShowPassword}
        error={errors.password}
        data-testid="password-input"
      />
      <PasswordWrapper
        id={'passwordConfirmation'}
        placeholder={t('passwordConfirmation')}
        type={showConfirmPassword ? 'text' : 'password'}
        title={t('passwordConfirmation')}
        register={register('passwordConfirmation')}
        toggleShowPassword={toggleShowConfirmPassword}
        error={errors.passwordConfirmation}
        data-testid="password-confirmation-input"
      />
      <AgreeBlock
        lngId={lngId}
        t={t}
        setCheckedAgree={setCheckedAgree}
        checkedAgree={checkedAgree}
      />
      <Button
        type="submit"
        className={'styled-btn styled-btn-1'}
        isLoading={isLoading}
        disabled={isLoading || !isValid || !checkedAgree}
      >
        {t('signUp')}
      </Button>
    </form>
  )
}
