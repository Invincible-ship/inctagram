'use client'

import { getIsUserInited, getUserId } from '@/entities/User'
import { PostListResponse } from '@/entities/Viewer'
import { HOME_PAGE_ID } from '@/shared/const/pages'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Page } from '@/widgets/Page/Page'
import { PostDetails, PostDetailsVariant } from '@/widgets/PostDetails'
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
import { FC, ReactNode, Suspense, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

type HomePageProps = {
  postsData?: PostListResponse
  children: ReactNode
}

const HomePage: FC<HomePageProps> = ({ postsData, children }) => {
  const isInited = useSelector(getIsUserInited)
  const isAuth = useSelector(getUserId)
  const hasMore = useSelector(getHasMore)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isInited) return

    dispatch(
      initPostList({
        page: PostListPage.HOME,
        type: isAuth ? PostListCardType.POST_DETAILS : PostListCardType.EXTENDED,
      }),
    )

    postsData ? dispatch(setPostsFromServer(postsData)) : dispatch(fetchAllPosts())
  }, [dispatch, postsData, isAuth, isInited])

  const onScrollEnd = useCallback(() => {
    isAuth && dispatch(fetchNextPosts())
  }, [dispatch, isAuth])

  return (
    <Suspense fallback={<HomePageSkeleton isAuth={!!isAuth} />}>
      <Page id={HOME_PAGE_ID} onScrollEnd={onScrollEnd} isTriggerActive={hasMore}>
        <VStack gap="36" max>
          {!isAuth && isInited && (
            <>
              {children}
              <PostDetails variant={PostDetailsVariant.MODAL} />
            </>
          )}
          <PostList />
        </VStack>
      </Page>
    </Suspense>
  )
}

const HomePageSkeleton = ({ isAuth }: { isAuth?: boolean }) => (
  <VStack align="center" gap="36" max>
    {!isAuth ? (
      <>
        <Skeleton width="100%" height={70} border="5px" />
        <HStack gap="8" max>
          {getSkeletons(4, PostListCardType.EXTENDED)}
        </HStack>
      </>
    ) : (
      getSkeletons(2, PostListCardType.POST_DETAILS)
    )}
  </VStack>
)

export default withAuth<HomePageProps>(HomePage, { routeRole: 'optional' })
