'use client'
import { FC, useEffect, useState } from 'react'
import { SignUpForm } from './SignUpForm'
import { SocialButtons } from '@/features/auth/signup/ui/SocialButtons'
import { useForm } from 'react-hook-form'
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
import { SignUpModal } from './signUpModalWindow/SignUpModal'

export type SignUpProps = {
  lng?: string
}
export const SignUp: FC<SignUpProps> = ({ lng }) => {
  const isLoading = useSelector(state => state.signup.isLoading)
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation(lng, 'signUp')
  const schema = formSchema(t)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
  })

  const onSubmit = data => {
    dispatch(signupThunk({ body: data, setError }))
  }

  //for SignUpModal
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  //useEffect(() => {
  //  if (!isError) {
  //    setIsOpen(true)
  //  }
  //}, [isError])
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
        {/*{(!isError && data && lng) && <SignUpModal lng={lng} onClose={onClose} isOpen={isOpen} userEmail={data.email} />}*/}
      </div>
    </div>
  )
}
