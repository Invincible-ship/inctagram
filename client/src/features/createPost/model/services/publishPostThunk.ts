import { ThunkConfig } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPostImages } from '../selectors/getPostImages'
import { getPostDescription } from '@/features/createPost/model/selectors/getPostDescription'
import { getEditedImages } from '../utils/getEditedImages'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { UploadPostRequestParams, createPost, uploadPostImages } from '@/entities/Post'
import { ApiError } from '@/shared/api/types'
import { FORM_DATA_FILE } from '../consts/createPost'

export const publishPostThunk = createAsyncThunk<void, void, ThunkConfig<string[]>>(
  'createPost/publishPost',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const description = getPostDescription(getState())
    const images = getPostImages(getState())

    const editedImages = await getEditedImages(images)

    const formData = new FormData()

    for (let i = 0; i < editedImages.length; i++) {
      formData.append(FORM_DATA_FILE, editedImages[i])
    }

    try {
      const { images } = await dispatch(uploadPostImages(formData)).unwrap()

      const childrenMetadata = images.map(({ uploadId }) => ({ uploadId }))

      const postData: UploadPostRequestParams = {
        description,
        childrenMetadata,
      }

      await dispatch(createPost(postData)).unwrap()
    } catch (err) {
      console.warn('Error has occured')
      if (isFetchBaseQueryError(err)) {
        const apiError = err.data as ApiError

        if (Array.isArray(apiError.messages)) {
          return rejectWithValue(apiError.messages.map(({ message }) => message))
        }

        return rejectWithValue([apiError.messages])
      }
    }
  },
)
