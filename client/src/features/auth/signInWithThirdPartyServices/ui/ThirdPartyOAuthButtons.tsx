import Google from '@/shared/assets/icons/google.svg'
import Github from '@/shared/assets/icons/github.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { getGoogleOAuthUrl } from '../model/utils/getGoogleOAuthUrl'
import { getGithubOAuthUrl } from '../model/utils/getGithubOAuthUrl'
import cls from './ThirdPartyOAuthButtons.module.scss'

const oauthButtons = [
  { icon: <Google />, hrefFn: getGoogleOAuthUrl, alt: 'google icon' },
  { icon: <Github />, hrefFn: getGithubOAuthUrl, alt: 'github icon' },
]

export const ThirdPartyOAuthButtons = () => {
  const lngId = useContext(LanguageContext) as LanguageIds

  return (
    <div className={cls.iconWrapper}>
      {oauthButtons.map(({ hrefFn, icon, alt }) => (
        <Link key={alt} href={hrefFn(lngId)} className={cls['img-wrapper']}>
          {icon}
        </Link>
      ))}
    </div>
  )
}
