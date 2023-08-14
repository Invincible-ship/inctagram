import { ForgotPassword } from '@/../src/features/auth/forgotPassword'
import { LanguageParams } from '@/shared/config/i18n/types'
import { FC } from 'react'

export const ForgotPage: FC<{ params: LanguageParams }> = (
  { params: { lng } }
) => {
  return (
    <div className={'content'}>
      <ForgotPassword lng={lng} />
    </div>
  )
}