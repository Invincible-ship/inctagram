import { FC } from 'react'
import { LanguageParams } from '@/shared/config/i18n/types'
import { EmailConfiramtion } from './EmailConfiramtion'

export const EmailConfiramtionPage: FC<{ params: LanguageParams }> = ({ params: { lng } }) => {
  return <EmailConfiramtion lng={lng} />
}
