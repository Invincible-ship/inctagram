'use client'

import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import {
  CONFIRMATION_STATUS,
  ConfirmationEmailViaCode,
} from '@/features/auth/confirmationEmailViaCode'
import { useSearchParams } from 'next/navigation'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useConfirmationEmailViaCodeMutation } from '@/entities/User'
import { Preloader } from '@/shared/ui/Preloader/Preloader'

export const ConfirmationEmailPage = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const { t } = useClientTranslation(lngId, Namespaces.CONFIRMATION_EMAIL)
  const searchParams = useSearchParams()
  const confirmationCode = searchParams.get('code') as string
  const email = searchParams.get('email') as string

  const [confirmEmailViaCode, { isSuccess, isUninitialized }] =
    useConfirmationEmailViaCodeMutation()

  useEffect(() => {
    confirmEmailViaCode({ confirmationCode })
  }, [confirmEmailViaCode, confirmationCode])

  if (isUninitialized) return <Preloader />

  return <ConfirmationEmailViaCode isSuccess={isSuccess} t={t} lngId={lngId} email={email} />
}
