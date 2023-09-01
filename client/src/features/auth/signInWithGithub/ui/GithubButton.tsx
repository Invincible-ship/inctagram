'use client'

import githubSrc from '@/shared/assets/icons/github.svg?url'
import cls from './GithubButton.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { getGithubOAuthUrl } from '../util/getGithubOAuthUrl'
import { useContext } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'

export const GithubButton = () => {
  const lngId = useContext(LanguageContext) as LanguageIds

  return (
    <Link href={getGithubOAuthUrl(lngId)} className={cls['icon-wrapper']}>
      <Image src={githubSrc} alt="github icon" />
    </Link>
  )
}
