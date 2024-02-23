import { addPostImage, setCurrentStep } from '../slice/createPostSlice'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { ImageFilter, ImageVariant } from '@/shared/ui/MyImage/MyImage'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const addCreatePostImageService = createAsyncThunk<
  void,
  { file: File; nextStep?: number | undefined },
  ThunkConfig
>('createPost/handleImageChange', async ({ file, nextStep }, { dispatch }) => {
  const id = Date.now()

  // const src = await file2Base64(file)
  const src = URL.createObjectURL(file)

  dispatch(
    addPostImage({
      file,
      id,
      src,
      orientation: ImageVariant.ORIGINAL,
      filter: ImageFilter.NORMAL,
      scale: 1,
    }),
  )

  nextStep && dispatch(setCurrentStep(nextStep))
})
