import Google from '@/shared/assets/icons/google.svg'
import Github from '@/shared/assets/icons/github.svg'
import Link from 'next/link'
import { useContext } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import cls from './ThirdPartyOAuthButtons.module.scss'
import { getGithubOAuthUrl } from '../model/utils/getGithubOAuthUrl'
import { useGoogleLogin } from '@react-oauth/google'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { signInWithGoogleThunk } from '../model/signInWithGoogleThunk'
import { useRouter } from 'next/navigation'

export const ThirdPartyOAuthButtons = () => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const dispatch = useAppDispatch()
  const router = useRouter()

  const signInWithGoogle = useGoogleLogin({
    onSuccess: ({ code }) => dispatch(signInWithGoogleThunk({ code, router })),
    flow: 'auth-code',
  })

  return (
    <div className={cls.iconWrapper}>
      <div className={cls['img-wrapper']} onClick={signInWithGoogle}>
        <Google />
      </div>
      <Link href={getGithubOAuthUrl(lngId)} className={cls['img-wrapper']}>
        <Github />
      </Link>
    </div>
  )
}
