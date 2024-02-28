'use client'

import { PostDetailsWrapper } from '../PostDetailsWrapper/PostDetailsWrapper'
import { IViewer } from '@/entities/Viewer'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page/Page'
import { HStack, VStack } from '@/shared/ui/Stack'
import {
  PostList,
  PostListPage,
  fetchPostsByProfileId,
  fetchNextPosts,
  initPostList,
  getHasMore,
  PostListCardType,
  getSkeletons,
} from '@/widgets/PostList'
import { ProfileCard, ProfileCardSkeleton } from '@/widgets/ProfileCard'
import { useParams } from 'next/navigation'
import { FC, Suspense, useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import React from 'react'

type ProfilePageProps = {
  profile: IViewer
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
    <Suspense fallback={<ProfilePageSkeleton mobile={mobile} />}>
      <Page isTriggerActive={hasMore} onScrollEnd={onScrollEnd}>
        <VStack data-testid="profile-page" gap={gap} max>
          <ProfileCard profile={memoizedProfile} mobile={mobile} />
          <PostList />
          <PostDetailsWrapper />
        </VStack>
      </Page>
    </Suspense>
  )
}

type ProfilePageSkeletonProps = {
  mobile?: boolean
  postCardType?: PostListCardType
  postsLength?: number
}

const ProfilePageSkeleton: FC<ProfilePageSkeletonProps> = props => {
  const { mobile, postCardType = PostListCardType.IMAGE, postsLength = 8 } = props
  const gap = !mobile ? '48' : '24'

  return (
    <VStack gap={gap} max>
      <ProfileCardSkeleton mobile={mobile} />
      <HStack gap="4" wrap="wrap" max>
        {getSkeletons(postsLength, postCardType)}
      </HStack>
    </VStack>
  )
}

export const ProfilePageClient = withAuth<ProfilePageProps>(ProfilePage, { routeRole: 'all' })
