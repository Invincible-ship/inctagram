import { ThunkConfig } from '@/app/providers/StoreProvider'
import { getHasMore, getIsLoading, getPage } from '../selectors/postListSelectors'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { PostListPage } from '../consts/postListPage'
import { fetchPostsByProfileId } from './fetchPostsByProfileId'
import { fetchAllPosts } from './fetchAllPosts'

export const fetchNextPosts = createAsyncThunk<void, string | undefined, ThunkConfig<unknown>>(
  'post/fetchNextPosts',
  async (profileId, { dispatch, getState }) => {
    const page = getPage(getState())
    const isLoading = getIsLoading(getState())
    const hasMore = getHasMore(getState())

    if (isLoading) {
      setTimeout(() => dispatch(fetchNextPosts(profileId)), 300)
      return
    }

    if (hasMore) {
      switch (page) {
        case PostListPage.PROFILE:
          profileId && dispatch(fetchPostsByProfileId(profileId))
          break
        case PostListPage.HOME:
          dispatch(fetchAllPosts())
        default:
          return
      }
    }
  },
)
