import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { signInWithGithub } from '@/features/auth/signInWithGithub'

export const SignInWithGithubPage = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code') || ''
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(signInWithGithub({ code, lngId, router }))
  }, [])

  return <Preloader />
}
