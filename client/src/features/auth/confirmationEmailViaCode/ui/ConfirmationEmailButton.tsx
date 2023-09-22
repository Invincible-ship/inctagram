'use client'

import { useResendLinkMutation } from '@/entities/User'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { LOCAL_STORAGE_IS_FIRST_AUTHORIZED } from '@/shared/const/localStorage'
import { Routes } from '@/shared/types/routes'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

export type CONFIRMATION_STATUS = 'success' | 'confirm' | 'invalid'

type ConfirmationEmailButtonProps = {
  className?: string
  email: string | undefined
  lngId: LanguageIds
  status: CONFIRMATION_STATUS
}

export const ConfirmationEmailButton: FC<ConfirmationEmailButtonProps> = props => {
  const { email, lngId, status, className } = props
  const { t } = useClientTranslation(lngId, Namespaces.CONFIRMATION_EMAIL)
  const [resendLink] = useResendLinkMutation()
  const router = useRouter()

  console.log('Language: ', lngId)

  if (status !== 'invalid' && !localStorage.getItem(LOCAL_STORAGE_IS_FIRST_AUTHORIZED)) {
    localStorage.setItem(LOCAL_STORAGE_IS_FIRST_AUTHORIZED, JSON.stringify(true))
  }

  const onClick = () => {
    status == 'invalid'
      ? resendLink({ email: email as string })
      : router.replace(`/${lngId}${Routes.SIGNIN}`)
  }

  return (
    <Button
      className={className}
      theme={ButtonTheme.DEFAULT}
      onClick={onClick}
      style={{ marginBottom: '50px' }}
    >
      {t(`${status}.button-text`)}
    </Button>
  )
}
