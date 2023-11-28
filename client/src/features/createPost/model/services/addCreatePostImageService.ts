import { addPostImage, setCurrentStep } from '../slice/createPostSlice'
import { ThunkConfig } from '@/providers/StoreProvider'
import { file2Base64 } from '@/shared/utils/file2Base64'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const addCreatePostImageService = createAsyncThunk<
  void,
  { file: File; nextStep?: number | undefined },
  ThunkConfig
>('createPost/handleImageChange', async ({ file, nextStep }, { dispatch }) => {
  const id = Date.now()

  const src = await file2Base64(file)
  dispatch(addPostImage({ file, id, src }))

  nextStep && dispatch(setCurrentStep(nextStep))
})
