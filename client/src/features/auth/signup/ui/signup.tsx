'use client'
import { FC } from 'react'
import { SignUpForm } from './SignUpForm'
import { SocialButtons } from '@/features/auth/signup/ui/SocialButtons'
import {SubmitHandler, useForm} from 'react-hook-form'
import { useClientTranslation } from '@/shared/config/i18n/client'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import style from './signup.module.scss'
import {
  formSchema,
  FormSchemaType,
} from '@/features/auth/signup/lib/validationConstants/validationConstants'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { signupThunk } from '@/features/auth/signup/model/signup'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

export const SignUp = () => {
  const isLoading = useSelector(state => state.signup.isLoading)
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation("", 'signUp')
  const schema = formSchema(t)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
  })

  const onSubmit:SubmitHandler<FormSchemaType> = data => {
    dispatch(signupThunk({ body: data, setError }))
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'form registration'}>
      <div className="form-wrapper auth-form">
        <div className={'title b-title bt26 semibold align-center'}>{t('signUp')}</div>
        <SocialButtons />
        <SignUpForm
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
          t={t}
          errors={errors}
          register={register}
        />
        <span className={`info b-title bt14  align-center semibold`}>
          {t('doYouHaveAnAccount')}
        </span>
        <Link
          href={'/signIn'}
          className={`b-title bt16 semibold ${style.linkRegistration} align-center`}
        >
          <span>{t('signIn')}</span>
        </Link>
      </div>
    </div>
  )
}
