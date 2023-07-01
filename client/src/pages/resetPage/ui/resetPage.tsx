import { ForgotPassword } from '@/features/auth/reset'
import { ResetPassword } from '@/features/auth/reset'
import { LanguageParams } from '@/shared/config/i18n/types'
import { FC } from 'react'

export const ResetPage: FC<{ params: LanguageParams }> = (
  { params: { lng } }
) => {
  return (
    <div className={'content'}>
      {/*<ForgotPassword lng={lng} />*/}
      <ResetPassword lng={lng} />
    </div>
  )
}