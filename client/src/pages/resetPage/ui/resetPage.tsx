
import { ResetPassword } from '@/features/auth/resetPassword'
import { LanguageParams } from '@/shared/config/i18n/types'
import { FC } from 'react'

export const ResetPage: FC<{ params: LanguageParams }> = (
  { params: { lng } }
) => {
  return (
    <div className={'content'}>
      <ResetPassword lng={lng} />
    </div>
  )
}