'use client'

import Github from '@/shared/assets/icons/github.svg'
import cls from './GithubButton.module.scss'
import Link from 'next/link'
import { getGithubOAuthUrl } from '../util/getGithubOAuthUrl'

export const GithubButton = () => {
  console.log('Github url: ', getGithubOAuthUrl())

  return (
    <Link href={getGithubOAuthUrl()} className={cls['icon-wrapper']}>
      <Github />
    </Link>
  )
}
