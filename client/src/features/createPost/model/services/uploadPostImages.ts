import { ThunkConfig } from '@/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { uploadPostImages } from '@/entities/Post/api/postApi'
import { getPostImages } from '../selectors/getPostImages'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { PostImage } from '@/entities/Post'
import { ApiError } from '@/shared/api/types'

export const uploadPostImagesThunk = createAsyncThunk<
  PostImage[] | undefined,
  void,
  ThunkConfig<string[]>
>('createPost/uploadImages', async (_, { getState, dispatch, rejectWithValue }) => {
  const images = getPostImages(getState())
  const formData = new FormData()

  images.forEach(({ file }) => formData.append('images', file))

  try {
    const response = await dispatch(uploadPostImages(formData)).unwrap()

    return response.images
  } catch (err) {
    if (isFetchBaseQueryError(err)) {
      const apiError = err.data as ApiError

      if (Array.isArray(apiError.messages)) {
        return rejectWithValue(apiError.messages.map(message => message.message))
      }
    }
  }
})
