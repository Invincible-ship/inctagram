'use client'

import { PostDetailsWrapper } from '../PostDetailsWrapper/PostDetailsWrapper'
import { getUserId } from '@/entities/User'
import { useGetPublicUserProfileQuery } from '@/entities/Viewer'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
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
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const ProfilePage = () => {
  const { t } = useClientTranslation(Namespaces.PROFILE_PAGE)
  const { id: profileId } = useParams()
  const userId = useSelector(getUserId)
  const hasMore = useSelector(getHasMore)
  const dispatch = useAppDispatch()

  const { data: profileData, isLoading: isProfileLoading } = useGetPublicUserProfileQuery(profileId)

  useEffect(() => {
    dispatch(initPostList({ page: PostListPage.PROFILE, currentId: profileId }))
    dispatch(fetchPostsByProfileId(profileId))
  }, [dispatch, profileId])

  const onScrollEnd = useCallback(() => {
    dispatch(fetchNextPosts(profileId))
  }, [dispatch, profileId])

  const owner = +profileId === userId

  return (
    <Page isTriggerActive={hasMore} onScrollEnd={onScrollEnd}>
      <VStack gap="48" max>
        <ProfileCard t={t} owner={owner} profile={profileData} isLoading={isProfileLoading} />
        <PostList />
        <PostDetailsWrapper />
      </VStack>
    </Page>
  )
}

export default withAuth(ProfilePage, { routeRole: 'all' })