'use client'
import React, { FC, FormEventHandler } from 'react'
import { InputField } from '@/shared/ui/InputField/InputField'
import { PasswordWrapper } from '@/shared/ui/PasswordWrapper/PasswordWrapper'
import { Button } from '@/shared/ui/Button/Button'
import '@/shared/styles/variables/common/_form.scss'
import cls from '../signup.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { LanguageIds } from '@/shared/config/i18n/types'
import { AgreeBlock } from '../agreeBlock/AgreeBlock'
import { FormSchemaType } from '../../lib/validationConstants/validationConstants'
import { FieldErrors, UseFormGetValues } from 'react-hook-form'

export type SignUpFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
  isLoading: boolean
  t: (key: string) => string
  errors: FieldErrors<FormSchemaType>
  register: any
  lngId: LanguageIds
  isValid: boolean
  setCheckedAgree: (checkedAgree: boolean) => void
  checkedAgree: boolean
  getValues: UseFormGetValues<FormSchemaType>
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
  getValues,
}) => {
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
        role="password"
        placeholder={t('password')}
        type={'password'}
        title={t('password')}
        register={register('password')}
        error={errors.password}
        data-testid="password-input"
      />
      <PasswordWrapper
        id="passwordConfirmation"
        role="password"
        placeholder={t('passwordConfirmation')}
        type={'password'}
        title={t('passwordConfirmation')}
        register={register('passwordConfirmation')}
        error={errors.passwordConfirmation}
        data-testid="password-confirmation-input"
      />
      <AgreeBlock
        lngId={lngId}
        t={t}
        setCheckedAgree={setCheckedAgree}
        checkedAgree={checkedAgree}
        getValues={getValues}
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
