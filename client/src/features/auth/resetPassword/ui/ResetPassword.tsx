'use client'

import React, { FC, useContext, useEffect, useState } from 'react'
import './resetPassword.scss'
import '@/shared/styles/variables/common/_form.scss'
import '@/shared/styles/variables/common/_b-titles.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  formSchema,
  FormSchemaType,
} from '@/features/auth/resetPassword/lib/validationConstants/validationConstants'
import { ResetPasswordForm } from '@/features/auth/resetPassword/ui/resetPasswordForm'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { Namespaces } from '@/shared/config/i18n/types'
import { getIsLoading } from '@/features/auth/signup/model/selectors/getIsLoading'
import { useSelector } from 'react-redux'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'

export const ResetPassword = () => {
  const lngId = useContext(LanguageContext)
  const isLoading = useSelector(getIsLoading)
  const { t } = useClientTranslation('', Namespaces.REQOVERY)
  const schema = formSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    try {
      // @ts-ignore
      await ResetPassword(data).unwrap()
    } catch (error) {
      // @ts-ignore
      if (error.data && error.data.errors) {
        for (const err of error.data.errors) {
          setError(err.field, {
            type: 'server',
            message: err.message,
          })
        }
      } else {
        console.error(error)
      }
    }
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'form'}>
      <div className="form-wrapper auth-form">
        <div className={'title b-title bt26 semibold align-center'}>{t('mainTitleReset')}</div>
        <ResetPasswordForm
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
          t={t}
          errors={errors}
          register={register}
        />
      </div>
    </div>
  )
}

export const ResetPasswordWithAuth = withAuth(ResetPassword, { routeRole: 'auth' })
