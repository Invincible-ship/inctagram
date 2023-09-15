import { AvatarUpload } from '@/features/avatarUpload'
import { LanguageParams } from '@/shared/config/i18n/types'
import { FC } from 'react'

export const AvatarUploadPage: FC<{ params: LanguageParams }> = ({ params: { lng } }) => {
  return (
    <div className={'content'}>
      <AvatarUpload lng={lng} />
    </div>
  )
}

// import dynamic from 'next/dynamic'
// import React from 'react'
//
// const AvatarUpload = dynamic(() => import('@/features/AvatarUpload'), { ssr: false })
//
// export const AvatarUploadPage = () => {
//   return (
//     <div className={'content'}>
//       <AvatarUpload />
//     </div>
//   )
// }
