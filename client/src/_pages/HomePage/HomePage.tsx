'use client'

import { PostListResponse } from '@/entities/Viewer'
import { HOME_PAGE_ID } from '@/shared/const/pages'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { VStack } from '@/shared/ui/Stack'
import { Page } from '@/widgets/Page/Page'
import {
  PostList,
  PostListCardType,
  PostListPage,
  fetchAllPosts,
  fetchNextPosts,
  getHasMore,
  getSkeletons,
  initPostList,
  setPostsFromServer,
} from '@/widgets/PostList'
import { FC, Suspense, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

type HomePageProps = {
  postsData?: PostListResponse
}

const HomePage: FC<HomePageProps> = ({ postsData }) => {
  const hasMore = useSelector(getHasMore)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initPostList({ page: PostListPage.HOME }))

    postsData ? dispatch(setPostsFromServer(postsData)) : dispatch(fetchAllPosts())
  }, [dispatch, postsData])

  const onScrollEnd = useCallback(() => {
    dispatch(fetchNextPosts())
  }, [dispatch])

  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <Page id={HOME_PAGE_ID} onScrollEnd={onScrollEnd} isTriggerActive={hasMore}>
        <PostList />
      </Page>
    </Suspense>
  )
}

const HomePageSkeleton = () => (
  <VStack align="center" gap="36" max>
    {getSkeletons(2, PostListCardType.EXTENDED)}
  </VStack>
)

export default withAuth<HomePageProps>(HomePage, { routeRole: 'optional' })
