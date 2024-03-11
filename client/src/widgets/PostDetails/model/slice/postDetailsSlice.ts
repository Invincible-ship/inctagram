import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostDetailsSchema } from '@/widgets/PostDetails/model/types/postDetailsSchema'
import { updatePostByIdMatcher } from '@/entities/Post'
import { deletePostThunk } from '@/features/post/deletePost'

const initialState: PostDetailsSchema = {
  editMode: false,
  isPostBeingDeleted: false,
}

export const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {
    setEditMode: (state, { payload }: PayloadAction<boolean>) => {
      state.editMode = payload
    },
    setUpdatedPostList: (state, { payload }: PayloadAction<boolean>) => {
      state.updatedPostList = payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deletePostThunk.pending, state => {
        state.isPostBeingDeleted = true
      })
      .addCase(deletePostThunk.fulfilled, state => {
        state.isPostBeingDeleted = false
      })
      .addCase(deletePostThunk.rejected, state => {
        state.isPostBeingDeleted = false
      })
      .addMatcher(updatePostByIdMatcher, state => {
        state.editMode = false
      })
  },
})

export const { reducer: postDetailsReducer } = postDetailsSlice
export const { setEditMode, setUpdatedPostList } = postDetailsSlice.actions
