import { deletePostMutation, getCurrentPost } from '@/entities/Post'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const deletePostThunk = createAsyncThunk<void, number, ThunkConfig<string>>(
  'post/deletePost',
  async (id, { dispatch, rejectWithValue }) => {
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
