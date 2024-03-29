'use client'

import { IViewer } from '@/entities/Viewer'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FC, memo, useMemo } from 'react'
import cls from './ProfileCard.module.scss'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { Namespaces } from '@/shared/config/i18n/types'
import { ProfileCardFeautures } from '@/widgets/ProfileCard/ui/ProfileCardFeautures/ProfileCardFeautures'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { ExtendedProfile } from '@/entities/Profile'

type ProfileCardProps = {
  mobile?: boolean
  profile: IViewer | ExtendedProfile
  isLoading?: boolean
  isAuthorized?: boolean
}

export const ProfileCard: FC<ProfileCardProps> = memo(
  ({ profile, mobile, isLoading, isAuthorized }) => {
    const { t } = useClientTranslation(Namespaces.PROFILE_PAGE)
    const avatar = profile.avatars.find(({ width }) => width == 192)

    const infoContainer = useMemo(() => {
      const align = mobile ? 'center' : 'start'
      const gap = !mobile ? '4' : undefined

      if (isLoading) return <InfoContainerSkeleton />

      return (
        isAuthorized && (
          <HStack className={cls.infoContainer} justify="between" align="center" max={mobile}>
            <VStack className={cls.block} align={align} gap={gap}>
              <HStack className={cls.amount}>{(profile as ExtendedProfile).followingCount}</HStack>
              <HStack>{t('profile.following')}</HStack>
            </VStack>
            <VStack className={cls.block} align={align} gap={gap}>
              <HStack className={cls.amount}>{(profile as ExtendedProfile).followersCount}</HStack>
              <HStack>{t('profile.followers')}</HStack>
            </VStack>
            <VStack className={cls.block} align={align} gap={gap}>
              <HStack className={cls.amount}>
                {(profile as ExtendedProfile).publicationsCount}
              </HStack>
              <HStack>{t('profile.publications')}</HStack>
            </VStack>
          </HStack>
        )
      )
    }, [mobile, t, isAuthorized, profile, isLoading])

    if (mobile) {
      return (
        <VStack data-testid="profile-card" className={cls.ProfileCard} gap="16" max>
          <VStack gap="4" max>
            <HStack gap="36" align="center" max>
              <Avatar src={avatar?.url} size={72} />
              {infoContainer}
            </HStack>
            <HStack className={cls.username}>{profile.userName}</HStack>
          </VStack>
          <ProfileCardFeautures mobile={true} t={t} />
          <HStack className={cls.aboutMe} max>
            {profile.aboutMe}
          </HStack>
        </VStack>
      )
    }

    return (
      <HStack data-testid="profile-card" className={cls.ProfileCard} gap="36" max>
        <Avatar src={avatar?.url} size={192} />
        <VStack gap="24" max>
          <HStack justify="between" align="center" max>
            <HStack className={cls.username}>{profile.userName}</HStack>
            <ProfileCardFeautures mobile={false} t={t} />
          </HStack>
          {infoContainer}
          <HStack className={cls.aboutMe}>{profile.aboutMe}</HStack>
        </VStack>
      </HStack>
    )
  },
)

ProfileCard.displayName = 'ProfileCard'

export const ProfileCardSkeleton = ({ mobile }: { mobile?: boolean }) =>
  !mobile ? (
    <HStack data-testid="profile-skeleton" gap="36" max>
      <HStack>
        <Skeleton width={192} height={192} border="50%" />
      </HStack>
      <VStack gap="24" max>
        <HStack align="center" gap="24" max>
          <Skeleton width="100%" height={70} border="12px" />
          <Skeleton width="100%" height={70} border="12px" />
        </HStack>
        <Skeleton width="100%" height={100} border="12px" />
      </VStack>
    </HStack>
  ) : (
    <VStack gap="16" max>
      <HStack gap="16" max>
        <HStack>
          <Skeleton width={AvatarSize.MEDIUM} height={AvatarSize.MEDIUM} border="50%" />
        </HStack>
        <Skeleton width="100%" height={AvatarSize.MEDIUM} border="8px" />
      </HStack>
      <Skeleton width="100%" height={AvatarSize.MEDIUM} border="8px" />
    </VStack>
  )

const InfoContainerSkeleton = ({ mobile }: { mobile?: boolean }) => {
  return !mobile ? (
    <HStack data-testid="post-info-skeleton" gap="16">
      <Skeleton width={130} height={50} border="10px" />
      <Skeleton width={130} height={50} border="10px" />
      <Skeleton width={130} height={50} border="10px" />
    </HStack>
  ) : null
}
