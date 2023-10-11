// SignUpForm.tsx
'use client'
import {FC, FormEventHandler, useEffect, useState} from 'react'
import {InputField} from '@/shared/ui/InputField/InputField'
import {PasswordWrapper} from '@/shared/ui/PasswordWrapper/PasswordWrapper'
import {Button} from '@/shared/ui/Button/Button'
import '@/shared/styles/variables/common/_form.scss'
import {LanguageIds} from "@/shared/config/i18n/types";
import {AgreeBlock} from "@/features/auth/signup/ui/agreeBlock/AgreeBlock";

export type SignUpFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
  isLoading: boolean
  t: (key: string) => string
  errors: Record<string, any>
  register: any
  lngId: LanguageIds

}

export const SignUpForm: FC<SignUpFormProps> = ({ onSubmit, t, errors, register, lngId }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const [disabled, setDisabled] = useState(true)
  const [checkedCheckbox, setCheckedCheckbox] = useState(false)

  const checkboxHandler = (check: boolean) => {
    setCheckedCheckbox(check)
    if (checkedCheckbox) {
      setDisabled(true)
    } else setDisabled(false)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [errors]);

  console.log(Object.keys(errors).length == 0)
  console.log(errors)

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <form onSubmit={onSubmit} className={'form-style'}>
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
        type={'email'}
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
      <AgreeBlock lngId={lngId} t={t} checkboxHandler={checkboxHandler}/>
      <Button type="submit" className={`styled-btn styled-btn-1`} disabled={disabled}>
        {t('signUp')}
      </Button>
    </form>
  )
}
