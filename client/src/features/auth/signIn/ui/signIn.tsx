'use client'
import React, { FC, useContext } from 'react'
import Link from 'next/link'
import s from './signIn.module.scss'
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
import {
  getIsSignInWithGoogleLoading,
  ThirdPartyOAuthButtons,
} from '@/features/auth/signInWithThirdPartyServices'
import { getError } from '../model/selectors/getError'
import { useRouter } from 'next/navigation'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { Card } from '@/shared/ui/Card/Card'
import { ErrorModal } from '../../ui/ErrorModal/ErrorModal'
import { setErrorType, setIsErrorModalOpen } from '../model/slice/signInSlice'
import { ErrorType } from '../model/types/types'
import { getErrorType } from '../model/selectors/getErrorType'
import { getIsErrorModalOpen } from '../model/selectors/getIsErrorModalOpen'
import { getInternetConnection } from '@/shared/utils/getInternetConnection'

export const SignIn: FC = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const { t } = useClientTranslation(Namespaces.SIGNIN)
  const schema = formSchema(t)
  const isSignInWithEmailLoading = useSelector(getIsSignInWithEmailLoading)
  const isSignInWithGoogleLoading = useSelector(getIsSignInWithGoogleLoading)
  const errorType = useSelector(getErrorType)
  const isErrorModalOpen = useSelector(getIsErrorModalOpen)
  const error = useSelector(getError)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<FormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    const connection = getInternetConnection()
    if (!connection) return setInternetError(true, 'internet')

    await dispatch(signInThunk({ body: data, router, setError }))
  }

  const setInternetError = (open: boolean, type?: ErrorType) => {
    dispatch(setErrorType(type))
    dispatch(setIsErrorModalOpen(open))
  }

  const errorModalOnClose = () => setInternetError(false)

  if (isSignInWithGoogleLoading) return <Preloader />

  return (
    <Card t={t} title={'signIn'}>
      <ThirdPartyOAuthButtons />
      <SignInForm
        lngId={lngId}
        t={t}
        isLoading={isSignInWithEmailLoading}
        errors={errors}
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        errorLogin={error ? t('errorLogin') : ''}
        isValid={isValid}
      />
      <span className={`info b-title bt16 align-center ${s.dontHaveAnAccount}`}>
        {t('dontHaveAnAccount')}?
      </span>
      <Link
        href={`/${lngId}${Routes.SIGNUP}`}
        className={`b-title bt16 semibold ${s.linkRegistration} align-center`}
      >
        <span>{t('signUp')}</span>
      </Link>
      <ErrorModal
        t={t}
        isOpen={isErrorModalOpen}
        onClose={errorModalOnClose}
        errorType={errorType}
      />
    </Card>
  )
}

export const SignInWithAuth = withAuth(SignIn, { routeRole: 'auth' })
