'use client'

import React, { FC, useContext } from 'react'
import Link from 'next/link'
import style from '@/features/auth/signup/ui/signup.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, FormSchemaType } from '../lib/validationConstants/validationConstants'
import { SignInForm } from './SignInForm'
import { useSelector } from 'react-redux'
import { signInThunk } from '../model/signInThunk'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { Routes } from '@/shared/types/routes'
import { getIsLoading as getIsSignInWithEmailLoading } from '../model/selectors/getIsLoading'
import { getIsSignInWithGoogleLoading } from '@/features/auth/signInWithThirdPartyServices'
import { getError } from '../model/selectors/getError'
import { ThirdPartyOAuthButtons } from '@/features/auth/signInWithThirdPartyServices'
import { useRouter } from 'next/navigation'
import { Preloader } from '@/shared/ui/Preloader/Preloader'

export const SignIn: FC = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const { t } = useClientTranslation(Namespaces.SIGNIN)
  const schema = formSchema(t)
  const isSignInWithEmailLoading = useSelector(getIsSignInWithEmailLoading)
  const isSignInWithGoogleLoading = useSelector(getIsSignInWithGoogleLoading)
  const error = useSelector(getError)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    dispatch(signInThunk({ ...data, router }))
  }

  if (isSignInWithGoogleLoading) return <Preloader />

  return (
    <div className={'form registration'}>
      <div className="form-wrapper auth-form">
        <div className={'title b-title bt26 semibold align-center'}>{t('signIn')}</div>
        <ThirdPartyOAuthButtons />
        <SignInForm
          t={t}
          isLoading={isSignInWithEmailLoading}
          errors={errors}
          register={register}
          onSubmit={handleSubmit(onSubmit)}
          errorLogin={error ? t('errorLogin') : ''}
        />
        <span className={'info b-title bt16 align-center'} style={{ marginBottom: 12 }}>
          {t('dontHaveAnAccount')}?
        </span>
        <Link
          href={`/${lngId}${Routes.SIGNUP}`}
          className={`b-title bt16 semibold ${style.linkRegistration} align-center`}
        >
          <span>{t('signUp')}</span>
        </Link>
      </div>
    </div>
  )
}

export const SignInWithAuth = withAuth(SignIn, { routeRole: 'auth' })
