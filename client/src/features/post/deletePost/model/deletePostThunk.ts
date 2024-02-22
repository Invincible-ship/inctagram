import { deletePostMutation, getCurrentPost } from '@/entities/Post'
import { ThunkConfig } from '@/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const deletePostThunk = createAsyncThunk<void, void, ThunkConfig<string>>(
  'post/deletePost',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { id } = getCurrentPost(getState())

    try {
      await dispatch(deletePostMutation(id)).unwrap()
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const apiError = err.data as ApiError
        if (Array.isArray(apiError.messages)) {
          return rejectWithValue(apiError.messages[0].message)
        }
      }

      return rejectWithValue('Unexpected error')
    }
  },
)
