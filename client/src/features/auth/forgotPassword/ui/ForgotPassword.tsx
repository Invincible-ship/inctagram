'use client'

import React, { FC, useContext, useState } from 'react'
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
import { Namespaces } from '@/shared/config/i18n/types'
import { useSelector } from 'react-redux'
import { getIsLoading } from '@/features/auth/signup/model/selectors/getIsLoading'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'

export const ForgotPassword = () => {
  const lngId = useContext(LanguageContext)
  const isLoading = useSelector(getIsLoading)
  const { t } = useClientTranslation('', Namespaces.REQOVERY)
  const schema = formSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
  })

  const [isActive, setIsActive] = useState(false)
  const verifyCaptcha = (token: string) => {
    recaptcha_response = token
    //@ts-ignore
    document.getElementById('g-recaptcha-error').innerHTML = ''
  }

  let recaptcha_response = ''

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    if (recaptcha_response.length == 0) {
      //@ts-ignore
      document.getElementById('g-recaptcha-error').innerHTML =
        '<span style="color:red;">This field is required.</span>'
      return false
    } else {
      setIsActive(true)
      return true
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
          recaptcha_response={recaptcha_response}
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
