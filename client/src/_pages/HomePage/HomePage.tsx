'use client'

import { PostListResponse } from '@/entities/Viewer'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page/Page'
import {
  PostList,
  PostListPage,
  fetchAllPosts,
  fetchNextPosts,
  getHasMore,
  initPostList,
  setPostsFromServer,
} from '@/widgets/PostList'
import { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

type HomePageProps = {
  postsData?: PostListResponse
}

const HomePage: FC<HomePageProps> = ({ postsData }) => {
  const hasMore = useSelector(getHasMore)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initPostList({ page: PostListPage.HOME }))

    if (postsData) dispatch(setPostsFromServer(postsData))
  }, [])

  const onScrollEnd = useCallback(() => {
    dispatch(fetchNextPosts())
  }, [dispatch])

  return (
    <Page onScrollEnd={onScrollEnd} isTriggerActive={hasMore}>
      <PostList />
    </Page>
  )
}

export default withAuth(HomePage, { routeRole: 'optional' })
