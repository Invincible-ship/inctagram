import { getLastPostId, getLimit, getSort, getSortOrder } from '../selectors/postListSelectors'
import { getAllPosts } from '@/entities/Viewer'
import { PostListResponse } from '@/entities/Viewer/model/types/types'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAllPosts = createAsyncThunk<
  PostListResponse,
  void,
  ThunkConfig<string | string[]>
>('postList/fetchAllPosts', async (_, { getState, dispatch, rejectWithValue }) => {
  const order = getSortOrder(getState())
  const sort = getSort(getState())
  const limit = getLimit(getState())
  const lastPostId = getLastPostId(getState())

  const config = {
    order,
    sort,
    limit,
    lastPostId,
  }

  try {
    // addQueryParams({
    //   sort,
    //   order,
    // })
    const postsData = await dispatch(getAllPosts(config)).unwrap()

    return postsData
  } catch (err) {
    console.warn('Error has occured')
    if (isFetchBaseQueryError(err)) {
      const apiError = err.data as ApiError

      if (Array.isArray(apiError.messages)) {
        return rejectWithValue(apiError.messages.map(({ message }) => message))
      }

      return rejectWithValue(apiError.messages)
    }

    return rejectWithValue('An unexpected error has occured!')
  }
})
