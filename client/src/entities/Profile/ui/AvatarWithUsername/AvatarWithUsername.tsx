import { IAvatar, IProfile } from '../../model/types/types'
import { IViewer } from '@/entities/Viewer'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { Routes } from '@/shared/types/routes'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { HStack } from '@/shared/ui/Stack'
import Link from 'next/link'
import { FC, Suspense, memo, useContext, useMemo } from 'react'

type AvatarWithUsernameProps = {
  className?: string
  user: DeepPartial<IViewer | IProfile> & { avatarUrl?: string }
}

const AvatarWithUsername: FC<AvatarWithUsernameProps> = memo(({ user, className }) => {
  const lngId = useContext(LanguageContext)
  const { id, avatars, userName, avatarUrl } = user

  const url = useMemo(() => {
    if (avatarUrl) return avatarUrl

    if (avatars?.length) {
      const avatar = avatars.find(avatar => avatar?.width == AvatarSize.SMALL) as IAvatar

      return avatar?.url
    }

    return ''
  }, [avatars, avatarUrl])

  return (
    <Link href={`/${lngId}${Routes.PROFILE}/${id}`}>
      <HStack className={className} align="center" justify="start" gap="12">
        <Avatar src={url} size={AvatarSize.SMALLEST} />
        {userName}
      </HStack>
    </Link>
  )
})

AvatarWithUsername.displayName = 'AvatarWithUsername'

export const AvatarWithUsernameSkeleton = () => (
  <HStack align="center" justify="start" gap="12">
    <Skeleton width={AvatarSize.SMALL} height={AvatarSize.SMALL} border="50%" />
    <Skeleton width={80} height={20} border="2px" />
  </HStack>
)

export const AvatarWithUsernameSuspense: FC<AvatarWithUsernameProps> = memo(
  ({ user, className }) => (
    <Suspense fallback={<AvatarWithUsernameSkeleton />}>
      <AvatarWithUsername user={user} className={className} />
    </Suspense>
  ),
)

AvatarWithUsernameSuspense.displayName = 'AvatarWithUsernameSuspense'
