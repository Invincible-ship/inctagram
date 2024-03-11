import { ProfileSearchType } from '@/entities/Profile/model/types/types'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FC, useContext, useMemo } from 'react'
import cls from './SearchUserCard.module.scss'
import Link from 'next/link'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'
import { Routes } from '@/shared/types/routes'
import { addUserToRecent } from '../../model/services/addUserToRecent'

type SearchUserCardProps = {
  user: ProfileSearchType
}

export const SearchUserCard: FC<SearchUserCardProps> = ({ user }) => {
  const { avatars, userName, firstName, lastName, id } = user
  const lngId = useContext(LanguageContext)

  const avatarUrl = useMemo(() => {
    const avatar = avatars.find(avatar => avatar.width === AvatarSize.SMALL)
    return avatar?.url || ''
  }, [avatars])

  const fullName = `${firstName || ''} ${lastName || ''}`

  const onUserClick = (user: ProfileSearchType) => () => {
    addUserToRecent(user)
  }

  return (
    <Link href={`/${lngId}${Routes.PROFILE}/${id}`} onClick={onUserClick(user)}>
      <HStack className={cls.SearchUserCard} gap="12">
        <Avatar src={avatarUrl} size={AvatarSize.SMALL} />
        <VStack gap="4">
          <HStack className={cls.username}>{userName}</HStack>
          <HStack className={cls.name}>{fullName}</HStack>
        </VStack>
      </HStack>
    </Link>
  )
}
