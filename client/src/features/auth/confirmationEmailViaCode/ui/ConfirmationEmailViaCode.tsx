import { CONFIRMATION_STATUS, ConfirmationEmailButton } from './ConfirmationEmailButton'
import { getImageProps } from '../utils/getImageProps'
import { FC } from 'react'
import cls from './ConfirmationEmailViaCode.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TFunction } from 'i18next'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { MyImage } from '@/shared/ui/MyImage/MyImage'

type ConfirmationEmailViaCodeProps = {
  isSuccess: boolean
  t: TFunction<Namespaces, undefined>
  lngId: LanguageIds
  email: string
}

export const ConfirmationEmailViaCode: FC<ConfirmationEmailViaCodeProps> = ({
  isSuccess,
  t,
  lngId,
  email,
}) => {
  const status: CONFIRMATION_STATUS = isSuccess ? 'success' : 'invalid'

  const { src, alt, width } = getImageProps(status)
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
      <MyImage src={src as string} width={width} alt={alt} />
    </main>
  )
}
