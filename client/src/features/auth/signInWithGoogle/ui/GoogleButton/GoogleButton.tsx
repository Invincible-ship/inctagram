'use client'

import googleUrl from '@/shared/assets/icons/google.svg?url'
import Image from 'next/image'
import cls from './GoogleButton.module.scss'
import { getGoogleOAuthUrl } from '../../util/getGoogleOAuthUrl'
import Link from 'next/link'
import { useContext } from 'react'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { LanguageIds } from '@/shared/config/i18n/types'

export const GoogleButton = () => {
  const lngId = useContext(LanguageContext) as LanguageIds

  return (
    <Link href={getGoogleOAuthUrl(lngId)} className={cls['icon-wrapper']}>
      {/* <Google /> */}
      <Image src={googleUrl} alt="google icon" />
    </Link>
  )
}
