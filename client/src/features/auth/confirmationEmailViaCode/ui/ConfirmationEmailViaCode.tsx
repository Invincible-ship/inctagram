'use client'

import { useConfirmationEmailViaCodeQuery } from '@/entities/User'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { Routes } from '@/shared/types/routes'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { redirect, useSearchParams } from 'next/navigation'
import { useContext } from 'react'

export const ConfirmationEmailViaCode = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const searchParams = useSearchParams()
  const code = searchParams.get('confirmationCode') as string

  const { data, isLoading } = useConfirmationEmailViaCodeQuery(code)

  if (isLoading) return <Preloader />

  redirect(
    `/${lngId}${Routes.CONFIRMATION_EMAIL}?status=${data?.status}${
      data?.email ? `&email=${data?.email}` : ''
    }`,
  )
}
