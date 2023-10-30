'use client'
import { useContext, useState } from 'react'
import { SignUpForm } from './SignUpForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useClientTranslation } from '@/shared/config/i18n/client'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import style from './signup.module.scss'
import { FormSchemaType, formSchema } from '../lib/validationConstants/validationConstants'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { signupThunk } from '../model/signup'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { getIsLoading as getIsSignUpLoading } from '../model/selectors/getIsLoading'
import { getIsSignUpModalOpen } from '../model/selectors/getIsSignUpModalOpen'
import { Routes } from '@/shared/types/routes'
import {
  ThirdPartyOAuthButtons,
  getIsSignInWithGoogleLoading,
} from '@/features/auth/signInWithThirdPartyServices'
import { SignUpModal } from './SignUpModal'
import { Preloader } from '@/shared/ui/Preloader/Preloader'

export const SignUp = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const [email, setEmail] = useState<string>('')
  const isSignUpLoading = useSelector(getIsSignUpLoading)
  const isSignInWithGoogleLoading = useSelector(getIsSignInWithGoogleLoading)
  const isSignUpModalOpen = useSelector(getIsSignUpModalOpen)
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation(lngId, Namespaces.SIGNUP)
  const schema = formSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchemaType>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    const body = { ...data, passwordConfirmation: undefined }
    dispatch(signupThunk({ body, setError }))
    setEmail(data.email)
  }

  if (isSignInWithGoogleLoading) return <Preloader />

  return (
    <>
      <div className={'form registration'}>
        <div className="form-wrapper auth-form">
          <div className={'title b-title bt26 semibold align-center'}>{t('signUp')}</div>
          <ThirdPartyOAuthButtons />
          <SignUpForm
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isSignUpLoading}
            t={t}
            errors={errors}
            register={register}
          />
          <span className={'info b-title bt16 align-center semibold'}>
            {t('doYouHaveAnAccount')}
          </span>
          <Link
            href={`/${lngId}${Routes.SIGNIN}`}
            className={`b-title bt16 semibold ${style.linkRegistration} align-center`}
          >
            <span>{t('signIn')}</span>
          </Link>
        </div>
      </div>
      <SignUpModal email={email} isSignUpModalOpen={isSignUpModalOpen} t={t} />
    </>
  )
}

export const SignUpWithAuth = withAuth(SignUp, { routeRole: 'auth' })
