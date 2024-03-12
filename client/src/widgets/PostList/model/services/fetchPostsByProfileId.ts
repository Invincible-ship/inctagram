import { getLastPostId, getLimit, getSort, getSortOrder } from '../selectors/postListSelectors'
import { getPostsByProfileId } from '@/entities/Viewer'
import { PostListResponse } from '@/entities/Viewer/model/types/types'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { addQueryParams } from '@/shared/lib/addQueryParams/addQueryParams'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPostsByProfileId = createAsyncThunk<
  PostListResponse,
  string,
  ThunkConfig<string | string[]>
>('profilePage/fetchPostByUserId', async (profileId, { getState, dispatch, rejectWithValue }) => {
  const order = getSortOrder(getState())
  const sort = getSort(getState())
  const limit = getLimit(getState())
  const lastPostId = getLastPostId(getState())

  const config = {
    profileId,
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
    const postsData = await dispatch(getPostsByProfileId(config)).unwrap()

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
