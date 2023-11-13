import { InputField } from '@/shared/ui/InputField/InputField'
import { PasswordWrapper } from '@/shared/ui/PasswordWrapper/PasswordWrapper'
import s from '@/features/auth/signIn/ui/signIn.module.scss'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import React, { FC, FormEventHandler, useState } from 'react'
import { setDisableError } from '@/features/auth/signIn/model/slice/signInSlice'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { classNames } from '@/shared/lib/classNames/classNames'

export type SignInFormProps = {
  errorLogin?: string
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
  t: (key: string) => string
  isLoading: boolean
  errors: Record<string, any>
  register: any
  isValid: boolean
}

export const SignInForm: FC<SignInFormProps> = ({
  onSubmit,
  t,
  errors,
  register,
  errorLogin,
  isLoading,
  isValid,
}) => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

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
        type={showPassword ? 'text' : 'password'}
        title={t('password')}
        toggleShowPassword={toggleShowPassword}
        register={register('password')}
        error={errors.password ? errors.password : { message: errorLogin }}
      />
      <div className={s.forgotPassword}>
        <Link className={s.forgotPasswordLink} href={'/forgotPassword'}>
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
