import { useServerTranslation } from '@/shared/config/i18n/server'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { classNames } from '@/shared/lib/classNames/classNames'
import { MyImage } from '@/shared/ui/MyImage/MyImage'
import {
  CONFIRMATION_STATUS,
  ConfirmationEmailButton,
} from '@/features/auth/confirmationEmailViaCode'
import cls from './ConfirmationEmailPage.module.scss'
import { getImageProps } from './utils/getImageProps'

type SearchParams = {
  status: CONFIRMATION_STATUS
  email?: string
  lng: string
}

export const ConfirmationEmailPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { status, email, lng: lngId } = searchParams
  const { t } = await useServerTranslation(lngId as LanguageIds, Namespaces.CONFIRMATION_EMAIL)

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
        lngId={lngId as LanguageIds}
        email={email}
      />
      <MyImage src={src as string} wrapperWidth={wrapperWidth} alt={alt} />
    </main>
  )
}
