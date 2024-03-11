'use client'

import { HStack, VStack } from '@/shared/ui/Stack'
import React, { ChangeEvent, useCallback, useState } from 'react'
import cls from './SearchPage.module.scss'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useLazyGetAllProfilesQuery } from '@/entities/Profile'
import { Input } from '@/shared/ui/Input/Input'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { SearchUserList } from '@/entities/Profile/ui/SearchUserList/SearchUserList'
import { Page } from '@/widgets/Page/Page'
import { ProfileSearchType } from '@/entities/Profile/model/types/types'

const SearchPage = () => {
  const { t } = useClientTranslation(Namespaces.SEARCH_PAGE)
  const [users, setUsers] = useState<ProfileSearchType[]>([])
  const [search, setSearch] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [getUsers, { data: usersData, isFetching }] = useLazyGetAllProfilesQuery()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setSearch(value)
    setUsers([])
    value !== '' && setIsTyping(true)

    value.length > 0 ? debouncedGetUsers(value) : setUsers([])
  }

  const fetchNextUsers = useCallback(async () => {
    setIsTyping(false)

    const cursor = usersData?.nextCursor
    if (!cursor) return

    const response = await getUsers({ search, cursor }).unwrap()
    setUsers(prev => [...prev, ...response.items])
  }, [usersData, search, getUsers])

  const debouncedGetUsers = useDebounce(async (search: string) => {
    setIsTyping(false)

    const response = await getUsers({ search }).unwrap()
    setUsers(response.items)
  }, 300)

  return (
    <Page onScrollEnd={fetchNextUsers} isTriggerActive={!!usersData?.nextCursor}>
      <VStack className={cls.SearchPage} gap="24" max>
        <VStack gap="16" max>
          <HStack className={cls.title}>{t('title')}</HStack>
          <Input
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder={t('input.placeholder')}
            full
          />
        </VStack>
        <SearchUserList
          users={users}
          t={t}
          loading={isTyping || (isFetching && !!search)}
          recent={search === ''}
        />
      </VStack>
    </Page>
  )
}

export default withAuth(SearchPage, { routeRole: 'all' })
