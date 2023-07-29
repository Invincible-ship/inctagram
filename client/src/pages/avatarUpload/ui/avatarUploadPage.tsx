import { avatarUpload } from '@/features/avatarUpload'
import { LanguageParams } from '@/shared/config/i18n/types'
import { FC } from 'react'

export const AvatarUploadPage: FC<{ params: LanguageParams }> = (
  { params: { lng } }
) => {
  return (
    <div className={'content'}>
      <h1>Hello</h1>
      <avatarUpload lng={lng} />
    </div>
  )
}