import Google from '@/shared/assets/icons/google.svg'
import Github from '@/shared/assets/icons/github.svg'
import Link from 'next/link'
import { useContext, useMemo } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'
import { getGoogleOAuthUrl } from '../model/utils/getGoogleOAuthUrl'
import cls from './ThirdPartyOAuthButtons.module.scss'
import { getGithubOAuthUrl } from '../model/utils/getGithubOAuthUrl'

export const ThirdPartyOAuthButtons = () => {
  const lngId = useContext(LanguageContext) as LanguageIds

  const oauthButtons = useMemo(
    () => [
      { icon: <Google />, hrefFn: getGoogleOAuthUrl, alt: 'google icon' },
      { icon: <Github />, hrefFn: getGithubOAuthUrl, alt: 'github icon' },
    ],
    [],
  )

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
