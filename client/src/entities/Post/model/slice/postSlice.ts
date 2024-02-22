import { IPost, IPostSchema } from '../types/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: IPostSchema = {
  post: {} as IPost,
  isBeingDeleted: false,
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCurrentPost: (state, { payload }: PayloadAction<IPost>) => {
      state.post = payload
    },
    resetCurrentPost: () => initialState,
  },
})

export const { reducer: postReducer } = postSlice
export const { setCurrentPost, resetCurrentPost } = postSlice.actions
