'use client'

import { PostDetails } from '@/widgets/PostDetails'
import { IViewer, PostListResponse } from '@/entities/Viewer'
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
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import React from 'react'
import { useGetProfileDataQuery } from '@/entities/Profile/api/profileApi'
import { getUserId } from '@/entities/User'
import { PostDetailsVariant } from '@/widgets/PostDetails'
import { PROFILE_PAGE_ID } from '@/shared/const/pages'

type ProfilePageProps = {
  publicProfile: IViewer
  posts?: PostListResponse | undefined
}

type ProfilePageParams = {
  id: string
}

export const ProfilePage: FC<ProfilePageProps> = ({ publicProfile }) => {
  const { id: profileId } = useParams<ProfilePageParams>()
  const isAuthorized = !!useSelector(getUserId)
  const hasMore = useSelector(getHasMore)
  const mobile = useMediaQuery('(max-width: 769px)')
  const gap = !mobile ? '48' : '24'
  const dispatch = useAppDispatch()

  const { data: authorizedProfile, isLoading: isProfileLoading } = useGetProfileDataQuery(
    publicProfile.userName,
    {
      skip: !isAuthorized,
    },
  )

  useEffect(() => {
    dispatch(initPostList({ page: PostListPage.PROFILE, currentId: profileId }))
    dispatch(fetchPostsByProfileId(profileId))
  }, [dispatch, profileId])

  const onScrollEnd = useCallback(() => {
    dispatch(fetchNextPosts(profileId))
  }, [dispatch, profileId])

  const memoizedProfile = useMemo(
    () => authorizedProfile || publicProfile,
    [publicProfile, authorizedProfile],
  )

  return (
    <Page id={PROFILE_PAGE_ID} isTriggerActive={hasMore} onScrollEnd={onScrollEnd}>
      <VStack data-testid="profile-page" gap={gap} max>
        <ProfileCard
          profile={memoizedProfile}
          mobile={mobile}
          isAuthorized={isAuthorized}
          isLoading={isProfileLoading}
        />
        <PostList />
        <PostDetails variant={PostDetailsVariant.MODAL} />
      </VStack>
    </Page>
  )
}

type ProfilePageSkeletonProps = {
  mobile?: boolean
  postCardType?: PostListCardType
  postsLength?: number
}

export const ProfilePageSkeleton: FC<ProfilePageSkeletonProps> = props => {
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

export default withAuth<ProfilePageProps>(ProfilePage, {
  routeRole: 'optional',
  fallback: <ProfilePageSkeleton />,
})
