import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { signInWithGoogle } from '@/features/auth/signInWithGoogle'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'

export const SignInWithGooglePage = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(signInWithGoogle({ code, lngId, router }))
  }, [])

  return <Preloader />
}
