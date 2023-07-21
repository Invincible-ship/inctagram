import { FC } from 'react'
import { Congratulation } from '@/features/auth/signup'
import { LanguageParams } from '@/shared/config/i18n/types'

export const CongratulationPage: FC<{ params: LanguageParams }> = (
  { params: { lng } }
) => {
  return <Congratulation lng={lng} />
}