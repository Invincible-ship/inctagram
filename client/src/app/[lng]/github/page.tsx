'use client'

import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage'
import { Routes } from '@/shared/types/routes'
import { redirect, useSearchParams } from 'next/navigation'

const GithubResponsePage = () => {
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('accessToken') as string

  if (typeof window != 'undefined' && accessToken)
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessToken)

  redirect(Routes.MAIN)
}

export default GithubResponsePage
