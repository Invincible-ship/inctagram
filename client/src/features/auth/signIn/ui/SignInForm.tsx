import { InputField } from '@/shared/ui/InputField/InputField'
import { PasswordWrapper } from '@/shared/ui/PasswordWrapper/PasswordWrapper'
import s from '@/features/auth/signIn/ui/signIn.module.scss'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import React, { FC, FormEventHandler } from 'react'
import { setDisableError } from '@/features/auth/signIn/model/slice/signInSlice'
import '@/app/styles/variables/common/_form.scss'
import '@/app/styles/variables/common/_b-titles.scss'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Routes } from '@/shared/types/routes'

export type SignInFormProps = {
  lngId: any
  errorLogin?: string
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
  t: (key: string) => string
  isLoading: boolean
  errors: Record<string, any>
  register: any
  isValid: boolean
}

export const SignInForm: FC<SignInFormProps> = ({
  lngId,
  onSubmit,
  t,
  errors,
  register,
  errorLogin,
  isLoading,
  isValid,
}) => {
  const dispatch = useAppDispatch()
  const disableError = () => {
    dispatch(setDisableError())
  }
  return (
    <form
      onSubmit={onSubmit}
      className={classNames('form-style', {}, [s.form])}
      onClick={disableError}
    >
      <InputField
        id={'email'}
        type={'text'}
        placeholder={'Epam@epam.com'}
        title={t('email')}
        register={register('email')}
        error={errors.email}
      />
      <PasswordWrapper
        id="password"
        className={'password'}
        placeholder={'******************'}
        type={'password'}
        title={t('password')}
        register={register('password')}
        error={errors.password ? errors.password : { message: errorLogin }}
      />
      <div className={s.forgotPassword}>
        <Link className={s.forgotPasswordLink} href={`/${lngId}${Routes.FORGOTPASSWORD}`}>
          {t('forgotPassword')}
        </Link>
      </div>
      <Button
        type="submit"
        className={'styled-btn styled-btn-1'}
        isLoading={isLoading}
        disabled={isLoading || !isValid}
      >
        {t('signIn')}
      </Button>
    </form>
  )
}
