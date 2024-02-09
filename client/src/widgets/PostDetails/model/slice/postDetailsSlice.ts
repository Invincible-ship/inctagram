import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostDetailsSchema } from '@/widgets/PostDetails/model/types/postDetailsSchema'

const initialState: PostDetailsSchema = {
  textValue: '',
  editMode: false,
}

export const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {
    setTextValue: (state, { payload }: PayloadAction<string>) => {
      state.textValue = payload
    },
    setEditMode: (state, { payload }: PayloadAction<boolean>) => {
      state.editMode = payload
    },
  },
})

export const { reducer: postDetailsReducer } = postDetailsSlice
export const { setTextValue, setEditMode } = postDetailsSlice.actions
