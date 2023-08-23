'use client'

import React, { FC, useContext } from 'react'
import Link from 'next/link'
import style from '@/features/auth/signup/ui/signup.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import s from './signIn.module.scss'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
// ТАК ДЕЛАТЬ НЕЛЬЗЯ: если какой-то UI принадлежит одному и более модулю, то его стоит вынести в shared слой
import { SocialButtons } from '@/features/auth/signup/ui/SocialButtons'
import { formSchema, FormSchemaType } from '../lib/validationConstants/validationConstants'
import { SignInForm } from './SignInForm'
import { useSelector } from 'react-redux'
import { signInThunk } from '../model/signInThunk'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { Namespaces } from '@/shared/config/i18n/types'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { Routes } from '@/shared/types/routes'
import { getIsLoading } from '../model/selectors/getIsLoading'
import { getError } from '../model/selectors/getError'

export const SignIn: FC = () => {
  const lngId = useContext(LanguageContext)
  // FIXME: correct translation with lngId so avoid only CSR rendering
  const { t } = useClientTranslation(lngId, Namespaces.SIGNIN)
  const schema = formSchema(t)
  const isLoading = useSelector(getIsLoading)
  const error = useSelector(getError)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    dispatch(signInThunk(data))
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'form registration' + ' ' + `${s.wrapper}`}>
      <div className="form-wrapper auth-form">
        <div className={'title b-title bt26 semibold align-center'}>{t('signIn')}</div>
        <SocialButtons />
        <SignInForm
          t={t}
          errors={errors}
          register={register}
          onSubmit={handleSubmit(onSubmit)}
          errorLogin={error ? t('errorLogin') : ''}
        />
        <span className={'info b-title bt16 align-center'}>{t('dontHaveAnAccount')}?</span>
        <Link
          href={'registration'}
          className={`b-title bt16 semibold ${style.linkRegistration} align-center`}
        >
          <span>{t('signUp')}</span>
        </Link>
      </div>
    </div>
  )
}

export const SignInWithAuth = withAuth(SignIn, { routeRole: 'auth' })
