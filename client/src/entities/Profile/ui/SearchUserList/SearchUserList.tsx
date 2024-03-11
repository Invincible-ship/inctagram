import { ProfileSearchType } from '@/entities/Profile/model/types/types'
import { SearchUserCard } from '@/entities/Profile/ui/SearchUserCard/SearchUserCard'
import { Namespaces } from '@/shared/config/i18n/types'
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage'
import { LocalStorageUser } from '@/shared/types/localStorage'
import { HStack, VStack } from '@/shared/ui/Stack'
import { TFunction } from 'i18next'
import { FC, useEffect, useMemo, useState } from 'react'
import cls from './SearchUserList.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { AvatarSize } from '@/shared/ui/Avatar/Avatar'

type SearchUserListProps = {
  users: ProfileSearchType[] | undefined
  t: TFunction<Namespaces, undefined>
  recent?: boolean
  loading?: boolean
}

export const SearchUserList: FC<SearchUserListProps> = ({ users, recent, t, loading }) => {
  const [recentUsers, setRecentUsers] = useState<ProfileSearchType[]>([])

  useEffect(() => {
    const jsonUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY)

    if (jsonUser) {
      const recent = (JSON.parse(jsonUser) as LocalStorageUser)?.search?.recent || []
      setRecentUsers(recent)
    }
  }, [])

  const actualUsers = useMemo(() => {
    return recent ? recentUsers : users
  }, [recent, recentUsers, users])

  const mods = {
    [cls.empty]: recent && recentUsers.length < 1,
  }

  return (
    <VStack className={classNames(cls.SearchUserList, mods)} gap="12" max>
      {recent && <HStack className={cls.title}>{t('list.recent.title')}</HStack>}
      {actualUsers?.map(user => <SearchUserCard key={user.id} user={user} />)}
      {loading && getCardSkeletons()}
      {recent && recentUsers.length < 1 && (
        <VStack className={cls.recentField} align="center" max>
          <HStack className={cls.subtitle}>{t('list.recent.subtitle')}</HStack>
          <HStack className={cls.text}>{t('list.recent.text')}</HStack>
        </VStack>
      )}
    </VStack>
  )
}

export const getCardSkeletons = () => {
  return Array.from({ length: 12 }, (_, idx) => (
    <HStack key={idx} gap="12">
      <Skeleton width={AvatarSize.SMALL} height={AvatarSize.SMALL} border="50%" />
      <VStack gap="8">
        <Skeleton width="200px" height="16px" border="5px" />
        <Skeleton width="200px" height="16px" border="5px" />
      </VStack>
    </HStack>
  ))
}
