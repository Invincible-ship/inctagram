'use client'

import { useResendLinkMutation } from '@/entities/User'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { LOCAL_STORAGE_IS_FIRST_AUTHORIZED } from '@/shared/const/localStorage'
import { Routes } from '@/shared/types/routes'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { TFunction } from 'i18next'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import toast from 'react-hot-toast'

export type CONFIRMATION_STATUS = 'success' | 'invalid'

type ConfirmationEmailButtonProps = {
  className?: string
  email: string | undefined
  lngId: LanguageIds
  t: TFunction<Namespaces, undefined>
  status: CONFIRMATION_STATUS
}

export const ConfirmationEmailButton: FC<ConfirmationEmailButtonProps> = props => {
  const { email, t, status, lngId, className } = props
  const [resendLink, { isLoading, isSuccess, reset: resetMutation }] = useResendLinkMutation()
  const router = useRouter()
  const baseUrl = `${
    __IS_DEV__
      ? process.env.NEXT_PUBLIC_DEVELOPMENT_CLIENT_URL
      : process.env.NEXT_PUBLIC_PRODUCTION_CLIENT_URL
  }/${lngId}`

  if (typeof window != 'undefined') {
    if (status !== 'invalid' && !localStorage.getItem(LOCAL_STORAGE_IS_FIRST_AUTHORIZED)) {
      localStorage.setItem(LOCAL_STORAGE_IS_FIRST_AUTHORIZED, JSON.stringify(true))
    }
  }

  const handleClick = () => {
    status == 'invalid'
      ? resendLink({ email: email as string, baseUrl })
      : router.replace(`/${lngId}${Routes.SIGNIN}`)
  }

  if (isSuccess) {
    toast.success(`${t('resend-success')} "${email}"`)
    resetMutation()
  }

  return (
    <Button
      className={className}
      theme={ButtonTheme.DEFAULT}
      onClick={handleClick}
      isLoading={isLoading}
      disabled={isLoading}
      style={{ marginBottom: '50px' }}
    >
      {t(`${status}.button-text`)}
    </Button>
  )
}
