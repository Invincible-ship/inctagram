'use client'
import Link from 'next/link'
import { Routes } from '@/shared/types/routes'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ConfirmationModal } from '@/shared/ui/confirmationModal/ConfirmationModal'
import {
  ForgotPasswordFormSchema,
  FormSchemaType,
} from '@/features/auth/forgotPassword/lib/validationConstants/validationConstants'
import toast from 'react-hot-toast'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { ApiError } from '@/shared/api/types'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { TFunction } from 'i18next'
import { Card } from '@/shared/ui/Card/Card'
import s from './forgotPassword.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import ReCAPTCHA from 'react-google-recaptcha'
import { ForgotPasswordForm } from '@/features/auth/forgotPassword/ui/forgotPasswordForm/forgotPasswordForm'
import { useForgotPasswordMutation } from '@/entities/User/api/userApi'
import { ReCaptcha } from '@/shared/ui/ReCaptcha/ReCaptcha'

type Props = {
  t: TFunction<Namespaces, undefined>
  lngId: LanguageIds
}
export const ForgotPassword = ({ t, lngId }: Props) => {
  const [forgot, { isLoading }] = useForgotPasswordMutation()
  const [email, setEmail] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)
  const onClose = () => setIsOpen(false)
  const schema = ForgotPasswordFormSchema(t)
  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<FormSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<FormSchemaType> = async ({ email, recaptcha }) => {
    try {
      await forgot({ email, recaptcha }).unwrap()
      setEmail(email)
      setIsOpen(true)
      reset()
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const apiError = error.data as ApiError
        if (Array.isArray(apiError.messages)) {
          toast.error(apiError.messages[0].message)
          if (apiError.messages[0].field === 'email') {
            setError('email', apiError.messages[0])
          }
        }
      }
    }
    recaptchaRef.current?.reset()
  }
  return (
    <Card t={t} title={'forgotPassword'}>
      <form onSubmit={handleSubmit(onSubmit)} className={'form-style'}>
        <ForgotPasswordForm
          errors={errors}
          isValid={isValid}
          register={register}
          t={t}
          email={email}
          isLoading={isLoading}
        />
        <div className={s.linkBox}>
          <Link className={s.link} href={`/${lngId}${Routes.SIGNIN}`}>
            {t('backToSignIn')}
          </Link>
        </div>
        <ReCaptcha errors={errors} t={t} ref={recaptchaRef} control={control} theme={'dark'} />
        <ConfirmationModal
          t={t}
          email={email}
          isSignUpModalOpen={isOpen}
          setIsAuthModalOpen={onClose}
        />
      </form>
    </Card>
  )
}
export const ForgotPasswordWithAuth = withAuth(ForgotPassword, { routeRole: 'auth' })
