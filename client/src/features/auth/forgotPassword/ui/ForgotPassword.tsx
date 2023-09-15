'use client'

import React, { useContext, useEffect, useState } from 'react'
import './forgotPassword.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { formSchema, FormSchemaType } from '../lib/validationConstants/validationConstants'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
// import { useSelector } from 'react-redux'
// import { getIsLoading } from '../model/selectors/getIsLoading'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { useForgotPasswordMutation } from '@/entities/User/api/userApi'
import { ConfirmationEmailButton } from '@/features/auth/confirmationEmailViaCode'
import cls from '@/_pages/ConfirmationEmailPage/ConfirmationEmailPage.module.scss'

export const ForgotPassword = props => {
  const lngId = useContext(LanguageContext)
  // const isLoading = useSelector(getIsLoading)
  const { t } = useClientTranslation(lngId, Namespaces.RECOVERY)
  const schema = formSchema(t)
  let [recaptchaResponse, setRecaptchaResponse] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [email, setEmail] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, isError } = useForgotPasswordMutation
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState('')
  // const navigate = useNavigate()

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
  })

  const verifyCaptcha = response => {
    setRecaptchaResponse(true)
  }

  const getEmail = event => {
    console.log(event)
    setEmail(event.target.value)
  }
  useEffect(() => {
    if (data) {
      if (data.exists) {
        // Показать сообщение о том, что email существует в базе данных.
        console.log('Email существует в базе данных')
      } else {
        // Показать сообщение о том, что email не существует в базе данных.
        console.log('Email не существует в базе данных')
      }
    }
  }, [data])

  const onSubmit: SubmitHandler<FormSchemaType> = async () => {
    if (recaptchaResponse) {
      handleOpenModal()
      // try {
      //   await isSuccess
      //   handleOpenModal()
      //   console.log('success')
      //   history.push(`/${lngId}${Routes.SIGNIN}`)
      // } catch (isError) {
      //   console.log('error')
      // }
      setIsActive(true)
      setRecaptchaError('')
    } else {
      setRecaptchaError(t('recaptureError'))
    }
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'form'}>
      <div className="form-wrapper auth-form">
        <div className={'title b-title bt26 semibold align-center'}>{t('mainTitle')}</div>
        <ForgotPasswordForm
          onSubmit={handleSubmit(onSubmit)}
          verifyCaptcha={verifyCaptcha}
          isLoading={isLoading}
          isActive={isActive}
          recaptcha_response={setRecaptchaResponse}
          lngId={lngId}
          getEmail={getEmail}
          setEmail={setEmail}
          email={email}
          isModalOpen={isModalOpen}
          recaptchaError={recaptchaError}
          handleCloseModal={handleCloseModal}
          isError={isError}
          t={t}
          errors={errors}
          register={register}
          setIsActive
        />
      </div>
    </div>
  )
}

export const ForgotPasswordWithAuth = withAuth(ForgotPassword, { routeRole: 'auth' })
