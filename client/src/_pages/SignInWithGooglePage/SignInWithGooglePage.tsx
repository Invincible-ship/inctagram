'use client'

import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { redirect, useSearchParams } from 'next/navigation'
import { useCallback, useContext, useEffect } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { useSignInWithGoogleQuery } from '@/entities/User'
import { Routes } from '@/shared/types/routes'
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage'

export const SignInWithGooglePage = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''

  const { data: signInWithGoogleResponse, isSuccess, error } = useSignInWithGoogleQuery(code)

  const checkGoogleOAuth = useCallback(() => {
    if (isSuccess) {
      console.log('SignIn with google response: ', signInWithGoogleResponse)
      const { accessToken } = signInWithGoogleResponse

      if (typeof window != 'undefined') localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessToken)

      redirect(`/${lngId}${Routes.MAIN}`)
    }

    // TODO: add ErrorPage
    console.warn(error)
  }, [signInWithGoogleResponse, isSuccess, error, lngId])

  useEffect(() => {
    checkGoogleOAuth()
  }, [checkGoogleOAuth])

  return <Preloader />
}
