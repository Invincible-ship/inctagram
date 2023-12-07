import { uploadPostImagesThunk } from '@/features/createPost/model/services/uploadPostImages'
import { ICreatePostSchema, CreatePostImage } from '../types/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initCreatePostFeature } from '@/features/createPost/model/services/initCreatePostFeature'
import { ImageVariant } from '@/shared/ui/MyImage/MyImage'

const initialState: ICreatePostSchema = {
  postData: {
    images: [],
  },
  maxStep: 4,
  currentStep: 1,
  isLoading: false,
  isUploadigPhotosLoading: false,
  errors: [],
}

export const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    setCurrentStep: (state, { payload }: PayloadAction<number>) => {
      state.currentStep = payload
    },
    setPreviousStep: (state, { payload }: PayloadAction<number | undefined>) => {
      state.previousStep = payload
    },
    setNextStep: (state, { payload }: PayloadAction<number | undefined>) => {
      state.nextStep = payload
    },
    addPostImage: (state, { payload }: PayloadAction<CreatePostImage>) => {
      state.postData.images = [...state.postData.images, payload]
    },
    setPostImageOrientation: (
      state,
      { payload }: PayloadAction<{ id: number; orientation: ImageVariant }>,
    ) => {
      state.postData.images.find(({ id }) => id == payload.id)!.orientation = payload.orientation
    },
    setPostImageScale: (state, { payload }: PayloadAction<{ id: number; scale: number }>) => {
      state.postData.images.find(({ id }) => id == payload.id)!.scale = payload.scale
    },
    deletePostImage: (state, { payload }: PayloadAction<number>) => {
      state.postData.images = state.postData.images.filter(({ id }) => id !== payload)
    },
    resetCreatePostState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(uploadPostImagesThunk.pending, state => {
      state.isUploadigPhotosLoading = true
    }),
      builder.addCase(uploadPostImagesThunk.fulfilled, (state, { payload }) => {
        state.isUploadigPhotosLoading = false
        state.postData.uploadId = payload?.[0].uploadId || ''
      }),
      builder.addCase(uploadPostImagesThunk.rejected, (state, { payload }) => {
        state.isUploadigPhotosLoading = false
        if (payload) state.errors = [...state.errors, ...payload]
      }),
      builder.addCase(initCreatePostFeature.pending, state => {
        state.isLoading = true
      }),
      builder.addCase(initCreatePostFeature.fulfilled, state => {
        state.isLoading = false
      }),
      builder.addCase(initCreatePostFeature.rejected, state => {
        state.isLoading = true
      })
  },
})

export const { reducer } = createPostSlice
export const {
  setCurrentStep,
  setPreviousStep,
  setNextStep,
  addPostImage,
  deletePostImage,
  setPostImageOrientation,
  setPostImageScale,
  resetCreatePostState,
} = createPostSlice.actions
