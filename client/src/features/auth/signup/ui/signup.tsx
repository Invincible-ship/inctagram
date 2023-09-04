'use client'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { SignUpForm } from './SignUpForm'
import { SocialButtons } from './SocialButtons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useClientTranslation } from '@/shared/config/i18n/client'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import style from './signup.module.scss'
import { FormSchemaType, formSchema } from '../lib/validationConstants/validationConstants'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { signupThunk } from '../model/signup'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { Namespaces } from '@/shared/config/i18n/types'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { getIsLoading } from '../model/selectors/getIsLoading'
import { ModalWindow } from './modalWindow/ModalWindow'
//import { ModalWindow } from './modalWindow/ModalWindow'

const signUpModaTitle = 'signUpModal.title'
const signUpModaText = 'signUpModal.text'

export const SignUp = () => {
  const lngId = useContext(LanguageContext)
  const isLoading = useSelector(getIsLoading)
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation(lngId, Namespaces.SIGNUP)
  const schema = formSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchemaType>({
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
  })

  //for SignUpModal
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>()
  const onClose = () => setIsOpen(false)
  //===============

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    dispatch(signupThunk({ body: data, setError }))
    //for SignUpModal
    setEmail(data.email)
    setIsOpen(true)
    //===============
  }

  //for SignUpModal
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setIsOpen(false)
      setEmail('')
    }
  }, [{ errors }])
  //===============

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
        <span className={'info b-title bt14  align-center semibold'}>
          {t('doYouHaveAnAccount')}
        </span>
        <Link
          href={'login'}
          className={`b-title bt16 semibold ${style.linkRegistration} align-center`}
        >
          <span>{t('signIn')}</span>
        </Link>
        {isOpen && Object.keys(errors).length === 0 && (
          <ModalWindow
            text={t(signUpModaText)}
            title={t(signUpModaTitle)}
            onClose={onClose}
            isOpen={isOpen}
            userEmail={email}
          />
        )}
      </div>
    </div>
  )
}

export const SignUpWithAuth = withAuth(SignUp, { routeRole: 'auth' })
