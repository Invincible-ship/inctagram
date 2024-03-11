'use client'

import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { HStack, VStack } from '@/shared/ui/Stack'
import {
  PostList,
  PostListCardType,
  PostListPage,
  addPosts,
  getPosts,
  initPostList,
} from '@/widgets/PostList'
import { useEffect } from 'react'
import cls from './FavoritesPage.module.scss'
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage'
import { LocalStorageUser } from '@/shared/types/localStorage'
import { useSelector } from 'react-redux'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { PostDetailsWrapper, setUpdatedPostList } from '@/widgets/PostDetails'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { getSkeletons as getPostCardSkeletons } from '@/widgets/PostList'

const FavoritesPage = () => {
  const { t } = useClientTranslation(Namespaces.FAVORITES)
  const posts = useSelector(getPosts.selectAll)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initPostList({ page: PostListPage.FAVORITES }))

    const userLocalStorage = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_USER_KEY) || 'null',
    ) as LocalStorageUser | null

    const posts = userLocalStorage?.favorites || []
    dispatch(addPosts(posts))
    dispatch(setUpdatedPostList(true))
  }, [])

  return (
    <VStack className={cls.FavoritesPage} gap="16" max>
      <HStack className={cls.title}>{t('title')}</HStack>
      <PostList />
      {posts.length < 1 && (
        <VStack className={cls.absentField} align="center" max>
          <HStack className={cls.subtitle}>{t('absent.subtitle')}</HStack>
          <HStack className={cls.text}>{t('absent.text')}</HStack>
        </VStack>
      )}
      <PostDetailsWrapper />
    </VStack>
  )
}

export const FavoritesPageSkeleton = () => (
  <VStack gap="16" max>
    <Skeleton width={200} height={40} border="5px" />
    <HStack gap="4" wrap="wrap" max>
      {getPostCardSkeletons(8, PostListCardType.IMAGE)}
    </HStack>
  </VStack>
)

export default withAuth(FavoritesPage, { routeRole: 'all' })
