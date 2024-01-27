import { IAvatar, IProfile } from '../../model/types/types'
import { IViewer } from '../../../Viewer/types/types'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { Routes } from '@/shared/types/routes'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { HStack } from '@/shared/ui/Stack'
import Link from 'next/link'
import { FC, Suspense, useContext, useMemo } from 'react'

type AvatarWithUsernameProps = {
  user: IViewer | IProfile
}

const AvatarWithUsername: FC<AvatarWithUsernameProps> = ({ user }) => {
  const lngId = useContext(LanguageContext)
  const { id, avatars, userName } = user

  const url = useMemo(() => {
    if (avatars.length) {
      const avatar = avatars.find(avatar => avatar.width == AvatarSize.SMALL) as IAvatar

      return avatar?.url
    }

    return ''
  }, [avatars])

  return (
    <Link href={`/${lngId}${Routes.PROFILE}/${id}`}>
      <HStack align="center" justify="start" gap="12">
        <Avatar src={url} size={AvatarSize.SMALL} />
        {userName}
      </HStack>
    </Link>
  )
}

export const AvatarWithUsernameSkeleton = () => (
  <HStack align="center" justify="start" gap="12">
    <Skeleton width={AvatarSize.SMALL} height={AvatarSize.SMALL} border="50%" />
    <Skeleton width={80} height={20} border="2px" />
  </HStack>
)

export const AvatarWithUsernameSuspense: FC<AvatarWithUsernameProps> = ({ user }) => (
  <Suspense fallback={<AvatarWithUsernameSkeleton />}>
    <AvatarWithUsername user={user} />
  </Suspense>
)