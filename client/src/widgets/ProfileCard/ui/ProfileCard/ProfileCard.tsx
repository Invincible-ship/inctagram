import { IViewer } from '@/entities/Viewer'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import { HStack, VStack } from '@/shared/ui/Stack'
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
  t: TFunction<Namespaces, undefined>
  owner: boolean
  profile?: IViewer
  isLoading: boolean
}

export const ProfileCard: FC<ProfileCardProps> = memo(({ t, profile, owner, isLoading }) => {
  const lngId = useContext(LanguageContext)

  const avatar = useMemo(
    () => profile?.avatars.find(({ width }) => width == AvatarSize.MEDIUM),
    [profile],
  )

  const profileFeautures = () => {
    if (owner)
      return (
        <Link href={`/${lngId}${Routes.PROFILE}/${profile?.id}/edit`}>
          <Button theme={ButtonTheme.SECONDARY}>{t('profile.settings')}</Button>
        </Link>
      )

    // TODO: change to real features after api will be added
    return (
      <HStack gap="12">
        <Button>Follow</Button>
        <Button theme={ButtonTheme.SECONDARY}>Send message</Button>
      </HStack>
    )
  }

  if (isLoading) return <ProfileSkeleton />

  return (
    profile && (
      <HStack className={cls.ProfileCard} gap="36" max>
        <HStack>
          <Avatar src={avatar?.url} size={AvatarSize.MEDIUM} />
        </HStack>
        <VStack gap="24" max>
          <HStack justify="between" align="center" max>
            <HStack className={cls.username}>{profile.userName}</HStack>
            {profileFeautures()}
          </HStack>
          <HStack className={cls.infoContainer} justify="between" align="center">
            <VStack className={cls.block} align="start" gap="4">
              <HStack className={cls.amount}>2 218</HStack>
              <HStack>{t('profile.following')}</HStack>
            </VStack>
            <VStack className={cls.block} align="start" gap="4">
              <HStack className={cls.amount}>2 358</HStack>
              <HStack>{t('profile.followers')}</HStack>
            </VStack>
            <VStack className={cls.block} align="start" gap="4">
              <HStack className={cls.amount}>2 764</HStack>
              <HStack>{t('profile.publications')}</HStack>
            </VStack>
          </HStack>
          <HStack className={cls.aboutMe}>{profile.aboutMe}</HStack>
        </VStack>
      </HStack>
    )
  )
})

ProfileCard.displayName = 'ProfileCard'

const ProfileSkeleton = () => (
  <HStack gap="36" max>
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
)
