import { publishPostThunk } from '@/features/createPost/model/services/publishPostThunk'
import { ICreatePostSchema, CreatePostImage, AnimationDirection } from '../types/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ImageFilter, ImageVariant } from '@/shared/ui/MyImage/MyImage'

const initialState: ICreatePostSchema = {
  postData: {
    images: [],
  },
  maxStep: 4,
  currentStep: 1,
  isLoading: false,
  errors: [],
  isModalForward: false,
  isModalBackward: false,
  animationDirection: 'forward',
}

export const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    // animation
    setAnimationDirection: (state, { payload }: PayloadAction<AnimationDirection>) => {
      state.animationDirection = payload
    },
    setIsModalForward: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalForward = payload
    },
    setIsModalBackward: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalBackward = payload
    },
    // Manage create post steps
    setCurrentStep: (state, { payload }: PayloadAction<number>) => {
      state.currentStep = payload
    },
    setPreviousStep: (state, { payload }: PayloadAction<number | undefined>) => {
      state.previousStep = payload
    },
    setNextStep: (state, { payload }: PayloadAction<number | undefined>) => {
      state.nextStep = payload
    },
    // adding/deleting create post image
    addPostImage: (state, { payload }: PayloadAction<CreatePostImage>) => {
      state.postData.images = [...state.postData.images, payload]
    },
    deletePostImage: (state, { payload }: PayloadAction<number>) => {
      state.postData.images = state.postData.images.filter(({ id }) => id !== payload)
    },
    // setting cropping image feutures
    setPostImageOrientation: (
      state,
      { payload }: PayloadAction<{ id: number; orientation: ImageVariant }>,
    ) => {
      state.postData.images.find(({ id }) => id == payload.id)!.orientation = payload.orientation
    },
    setPostImageScale: (state, { payload }: PayloadAction<{ id: number; scale: number }>) => {
      state.postData.images.find(({ id }) => id == payload.id)!.scale = payload.scale
    },
    // setting filtering image feuture
    setPostImageFilter: (
      state,
      { payload }: PayloadAction<{ id: number; filter: ImageFilter }>,
    ) => {
      state.postData.images.find(({ id }) => id == payload.id)!.filter = payload.filter
    },
    // setting post description
    setPostDescription: (state, { payload }: PayloadAction<string>) => {
      state.postData.description = payload
    },
    // setting create post errors
    setCreatePostErrors: (state, { payload }: PayloadAction<string[]>) => {
      state.errors = payload
    },
    // save/open draft
    saveDraft: state => {
      const { draft, ...rest } = state
      state.draft = { ...rest }
    },
    openDraftAC: ({ draft }) => draft || initialState,
    // reset state
    resetCreatePostState: ({ draft }) => ({ ...initialState, draft }),
  },
  extraReducers: builder => {
    builder
      .addCase(publishPostThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(publishPostThunk.fulfilled, state => {
        state.isLoading = false
        state.errors = []
        state.postData.images.forEach(({ src }) => URL.revokeObjectURL(src))
      })
      .addCase(publishPostThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        if (payload) state.errors = payload
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
  setPostImageFilter,
  setPostImageScale,
  setPostDescription,
  setCreatePostErrors,
  saveDraft,
  openDraftAC,
  resetCreatePostState,
  setIsModalBackward,
  setIsModalForward,
  setAnimationDirection,
} = createPostSlice.actions
