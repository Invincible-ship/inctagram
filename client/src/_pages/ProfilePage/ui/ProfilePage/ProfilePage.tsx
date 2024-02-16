'use client'

import { PostDetailsWrapper } from '../PostDetailsWrapper/PostDetailsWrapper'
import { IViewer } from '@/entities/Viewer'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page/Page'
import { VStack } from '@/shared/ui/Stack'
import {
  PostList,
  PostListPage,
  fetchPostsByProfileId,
  fetchNextPosts,
  initPostList,
  getHasMore,
} from '@/widgets/PostList'
import { ProfileCard } from '@/widgets/ProfileCard'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import React from 'react'

type ProfilePageProps = {
  profile?: IViewer
}

export const ProfilePage: FC<ProfilePageProps> = ({ profile }) => {
  const { id: profileId } = useParams()
  const hasMore = useSelector(getHasMore)
  const mobile = useMediaQuery('(max-width: 769px)')
  const gap = !mobile ? '48' : '24'
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initPostList({ page: PostListPage.PROFILE, currentId: profileId }))
    dispatch(fetchPostsByProfileId(profileId))
  }, [dispatch, profileId])

  const onScrollEnd = useCallback(() => {
    dispatch(fetchNextPosts(profileId))
  }, [dispatch, profileId])

  const memoizedProfile = useMemo(() => profile, [profile])

  return (
    <Page isTriggerActive={hasMore} onScrollEnd={onScrollEnd}>
      <VStack data-testid="profile-page" gap={gap} max>
        <ProfileCard profile={memoizedProfile} mobile={mobile} />
        <PostList />
        <PostDetailsWrapper />
      </VStack>
    </Page>
  )
}

export const ProfilePageClient = withAuth<ProfilePageProps>(ProfilePage, { routeRole: 'all' })
