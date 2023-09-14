'use client'

import { useConfirmationEmailViaCodeQuery } from '@/entities/User'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { Routes } from '@/shared/types/routes'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext } from 'react'

export const ConfirmationEmailViaCode = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const searchParams = useSearchParams()
  const code = searchParams.get('confirmationCode') as string
  console.log('Confirmation code: ', code)
  const router = useRouter()

  const { data, isSuccess, isError, error } = useConfirmationEmailViaCodeQuery(code)
  console.log('Response confirmation email data: ', data)

  if (isError) console.log('Confiramtion registration error: ', JSON.stringify(error))

  if (!isSuccess) return <Preloader />

  return router.replace(
    `/${lngId}${Routes.CONFIRMATION_EMAIL}?status=${data?.status}${
      data?.email ? `&email=${data?.email}` : ''
    }&lng=${lngId}`,
  )
}
