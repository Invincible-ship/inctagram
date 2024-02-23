import { ThunkConfig } from '@/app/providers/StoreProvider'
import { getHasMore, getIsLoading, getPage } from '../selectors/postListSelectors'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { PostListPage } from '@/widgets/PostList/model/consts/postListPage'
import { fetchPostsByProfileId } from '@/widgets/PostList/model/services/fetchPostsByProfileId'

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
        default:
          return
      }
    }
  },
)
