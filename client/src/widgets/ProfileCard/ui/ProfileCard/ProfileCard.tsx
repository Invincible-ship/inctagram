import { IViewer } from '@/entities/Viewer'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import { Flex, HStack, VStack } from '@/shared/ui/Stack'
import { FC, memo, useContext, useMemo } from 'react'
import cls from './ProfileCard.module.scss'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { Routes } from '@/shared/types/routes'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'

type ProfileCardProps = {
  mobile?: boolean
  t: TFunction<Namespaces, undefined>
  owner: boolean
  profile?: IViewer
  isLoading: boolean
}

export const ProfileCard: FC<ProfileCardProps> = memo(
  ({ t, profile, owner, isLoading, mobile }) => {
    const lngId = useContext(LanguageContext)

    const avatar = useMemo(
      () => profile?.avatars.find(({ width }) => width == AvatarSize.LARGE),
      [profile],
    )

    const profileFeautures = useMemo(() => {
      if (owner)
        return !mobile ? (
          <Link href={`/${lngId}${Routes.PROFILE}/${profile?.id}/edit`}>
            <Button data-testid="settings-btn" theme={ButtonTheme.SECONDARY}>
              {t('profile.settings')}
            </Button>
          </Link>
        ) : null

      // TODO: change to real features after api will be added
      return (
        <Flex direction={mobile ? 'column' : 'row'} gap="12" max={mobile}>
          <Button full={mobile}>Follow</Button>
          <Button theme={ButtonTheme.SECONDARY} full={mobile}>
            Send message
          </Button>
        </Flex>
      )
    }, [owner, lngId, profile, t, mobile])

    const infoContainer = useMemo(() => {
      const align = mobile ? 'center' : 'start'
      const gap = !mobile ? '4' : undefined

      return (
        <HStack className={cls.infoContainer} justify="between" align="center" max={mobile}>
          <VStack className={cls.block} align={align} gap={gap}>
            <HStack className={cls.amount}>2 218</HStack>
            <HStack>{t('profile.following')}</HStack>
          </VStack>
          <VStack className={cls.block} align={align} gap={gap}>
            <HStack className={cls.amount}>2 358</HStack>
            <HStack>{t('profile.followers')}</HStack>
          </VStack>
          <VStack className={cls.block} align={align} gap={gap}>
            <HStack className={cls.amount}>2 764</HStack>
            <HStack>{t('profile.publications')}</HStack>
          </VStack>
        </HStack>
      )
    }, [mobile, t])

    if (isLoading) return <ProfileSkeleton mobile={mobile} />

    if (mobile) {
      return (
        profile && (
          <VStack data-testid="profile-card" className={cls.ProfileCard} gap="16" max>
            <VStack gap="4" max>
              <HStack gap="36" align="center" max>
                <HStack>
                  <Avatar src={avatar?.url} size={AvatarSize.MEDIUM} />
                </HStack>
                {infoContainer}
              </HStack>
              <HStack className={cls.username}>{profile.userName}</HStack>
            </VStack>
            {profileFeautures}
            <HStack className={cls.aboutMe} max>
              {profile.aboutMe}
            </HStack>
          </VStack>
        )
      )
    }

    return (
      profile && (
        <HStack data-testid="profile-card" className={cls.ProfileCard} gap="36" max>
          <HStack>
            <Avatar src={avatar?.url} size={AvatarSize.LARGE} />
          </HStack>
          <VStack gap="24" max>
            <HStack justify="between" align="center" max>
              <HStack className={cls.username}>{profile.userName}</HStack>
              {profileFeautures}
            </HStack>
            {infoContainer}
            <HStack className={cls.aboutMe}>{profile.aboutMe}</HStack>
          </VStack>
        </HStack>
      )
    )
  },
)

ProfileCard.displayName = 'ProfileCard'

const ProfileSkeleton = ({ mobile }: { mobile?: boolean }) =>
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
