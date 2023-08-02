import { FC } from 'react'
import { ResendLink } from '@/features/auth/emailConfiramtion'
import { LanguageParams } from '@/shared/config/i18n/types'

export const ResendLinkPage: FC<{ params: LanguageParams }> = ({ params: { lng } }) => {
  return <ResendLink lng={lng} />
}
