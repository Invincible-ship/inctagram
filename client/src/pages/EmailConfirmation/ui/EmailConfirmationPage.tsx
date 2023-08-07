import { FC } from 'react'
import { LanguageParams } from '@/shared/config/i18n/types'
import { EmailConfirmation } from './EmailConfirmation'

export const EmailConfirmationPage: FC<{ params: LanguageParams }> = ({ params: { lng } }) => {
  return <EmailConfirmation lng={lng} />
}
