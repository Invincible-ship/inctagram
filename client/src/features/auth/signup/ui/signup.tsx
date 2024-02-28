'use client'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useClientTranslation } from '@/shared/config/i18n/client'
import '@/app/styles/variables/common/_form.scss'
import '@/app/styles/variables/common/_b-titles.scss'
import style from './signup.module.scss'
import { FormSchemaType, formSchema } from '../lib/validationConstants/validationConstants'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { signupThunk } from '../model/signup'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { getIsLoading as getIsSignUpLoading } from '../model/selectors/getIsLoading'
import { getIsConfirmationModalOpen } from '../model/selectors/getIsConfirmationModalOpen'
import { getIsErrorModalOpen } from '../model/selectors/getIsErrorModalOpen'
import { Routes } from '@/shared/types/routes'
import {
  ThirdPartyOAuth,
  getIsSignInWithGoogleLoading,
} from '@/features/auth/signInWithThirdPartyServices'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { ConfirmationModal } from '@/features/auth/ui/ConfirmationModal/ConfirmationModal'
import { SignUpForm } from '@/features/auth/signup/ui/signUpForm/SignUpForm'
import {
  setErrorType,
  setIsConfirmationModalOpen,
  setIsErrorModalOpen,
} from '../model/slice/signUpSlice'
import { ErrorModal } from '../../ui/ErrorModal/ErrorModal'
import { getErrorType } from '../model/selectors/getErrorType'
import { ErrorType } from '../model/types/types'
import { getInternetConnection } from '@/shared/utils/getInternetConnection'
import { getDefaultValues } from '../model/selectors/getDefaultValues'

export const SignUp = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const defaultValues = useSelector(getDefaultValues)
  const isSignUpLoading = useSelector(getIsSignUpLoading)
  const isSignInWithGoogleLoading = useSelector(getIsSignInWithGoogleLoading)
  const isConfirmationModalOpen = useSelector(getIsConfirmationModalOpen)
  const isErrorModalOpen = useSelector(getIsErrorModalOpen)
  const errorType = useSelector(getErrorType)
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation(Namespaces.SIGNUP)
  const schema = formSchema(t)
  const [checkedAgree, setCheckedAgree] = useState(false)

  const {
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm<FormSchemaType>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    const connection = getInternetConnection()
    if (!connection) return setModalError(true, 'internet')

    if (isValid && checkedAgree) {
      const { passwordConfirmation, ...body } = data
      const { userName, email } = body
      const thunkProps = { body, setError, setModalError, resetForm }

      dispatch(signupThunk(thunkProps))
      setEmail(email)
      setUsername(userName)
    }
  }

  const setModalError = (open: boolean, type?: ErrorType) => {
    dispatch(setErrorType(type))
    dispatch(setIsErrorModalOpen(open))
  }

  if (isSignInWithGoogleLoading) return <Preloader />

  const confirmationModalOnClose = () => dispatch(setIsConfirmationModalOpen(false))
  const errorModalOnClose = () => setModalError(false)

  return (
    <>
      <div className={'form registration'}>
        <div className="form-wrapper auth-form">
          <div className={'title b-title bt26 semibold align-center'}>{t('signUp')}</div>
          <ThirdPartyOAuth />
          <SignUpForm
            lngId={lngId}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isSignUpLoading}
            t={t}
            errors={errors}
            register={register}
            isValid={isValid}
            setCheckedAgree={setCheckedAgree}
            checkedAgree={checkedAgree}
            getValues={getValues}
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
      <ConfirmationModal
        onClose={confirmationModalOnClose}
        email={email}
        isOpen={isConfirmationModalOpen}
        t={t}
      />
      {errorType && (
        <ErrorModal
          email={email}
          username={username}
          onClose={errorModalOnClose}
          errorType={errorType}
          isOpen={isErrorModalOpen}
          t={t}
        />
      )}
    </>
  )
}

export const SignUpWithAuth = withAuth(SignUp, { routeRole: 'auth' })
