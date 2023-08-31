'use client'

import Github from '@/shared/assets/icons/github.svg'
import cls from './GithubButton.module.scss'
import Link from 'next/link'
import { getGithubOAuthUrl } from '../util/getGithubOAuthUrl'
import { useContext } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'

export const GithubButton = () => {
  const lngId = useContext(LanguageContext) as LanguageIds

  return (
    <Link href={getGithubOAuthUrl(lngId)} className={cls['icon-wrapper']}>
      <Github />
    </Link>
  )
}
