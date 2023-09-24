'use client'

import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { classNames } from '@/shared/lib/classNames/classNames'
import { MyImage } from '@/shared/ui/MyImage/MyImage'
import {
  CONFIRMATION_STATUS,
  ConfirmationEmailButton,
} from '@/features/auth/confirmationEmailViaCode'
import cls from './ConfirmationEmailPage.module.scss'
import { getImageProps } from './utils/getImageProps'
import { useSearchParams } from 'next/navigation'
import { useClientTranslation } from '@/shared/config/i18n/client'

export const ConfirmationEmailPage = () => {
  const searchParams = useSearchParams()

  const status = searchParams.get('status') as CONFIRMATION_STATUS
  const email = searchParams.get('email') as string | undefined
  const lngId = searchParams.get('lng') as LanguageIds

  const { t } = useClientTranslation(lngId, Namespaces.CONFIRMATION_EMAIL)

  const { src, alt, wrapperWidth } = getImageProps(status)
  const mods = {
    [cls.paddingText]: status != 'invalid',
  }

  return (
    <main className={cls.page}>
      <h2>{t(`${status}.title`)}</h2>
      <p className={classNames(cls.text, mods)}>{t(`${status}.text`)}</p>
      <ConfirmationEmailButton
        className={cls.btn}
        status={status}
        t={t}
        lngId={lngId}
        email={email}
      />
      <MyImage src={src as string} wrapperWidth={wrapperWidth} alt={alt} />
    </main>
  )
}
