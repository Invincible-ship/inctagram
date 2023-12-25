import { IAvatar, ProfileAvatars } from '@/entities/Profile'
import { IUser, getUserAuthData } from '@/entities/User'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { Routes } from '@/shared/types/routes'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { HStack } from '@/shared/ui/Stack'
import Link from 'next/link'
import { Suspense, useContext } from 'react'
import { useSelector } from 'react-redux'

const AvatarWithUsername = () => {
  const lngId = useContext(LanguageContext)
  const { userName, userId } = useSelector(getUserAuthData) as IUser
  const avatar = useSelector(ProfileAvatars.getSmall) as IAvatar

  return (
    <Link href={`/${lngId}${Routes.PROFILE}/${userId}`}>
      <HStack align="center" justify="start" gap="12">
        <Avatar src={avatar.url} size={AvatarSize.SMALL} />
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

export const AvatarWithUsernameSuspense = () => (
  <Suspense fallback={<AvatarWithUsernameSkeleton />}>
    <AvatarWithUsername />
  </Suspense>
)
