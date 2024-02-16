'use client'

import Google from '@/shared/assets/icons/google.svg'
import Github from '@/shared/assets/icons/github.svg'
import Link from 'next/link'
import cls from './ThirdPartyOAuth.module.scss'
import { getGithubOAuthUrl } from '../model/utils/getGithubOAuthUrl'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { signInWithGoogleThunk } from '../model/signInWithGoogleThunk'

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string

const ThirdPartyOAuthButtons = () => {
  const dispatch = useAppDispatch()

  const signInWithGoogle = useGoogleLogin({
    onSuccess: ({ code }) => dispatch(signInWithGoogleThunk(code)),
    flow: 'auth-code',
  })

  return (
    <div className={cls.iconWrapper}>
      <div className={cls['img-wrapper']} onClick={signInWithGoogle}>
        <Google />
      </div>
      <Link href={getGithubOAuthUrl()} className={cls['img-wrapper']}>
        <Github />
      </Link>
    </div>
  )
}

export const ThirdPartyOAuth = () => (
  <GoogleOAuthProvider clientId={googleClientId}>
    <ThirdPartyOAuthButtons />
  </GoogleOAuthProvider>
)
