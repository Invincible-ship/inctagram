import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PositionWithPath, UISchema } from '../types/UISchema'

const initialState: UISchema = {
  scroll: {},
}

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setScrollPositionForPath: (state, { payload }: PayloadAction<PositionWithPath>) => {
      state.scroll[payload.pathname] = payload.position
    },
  },
})

export const { setScrollPositionForPath } = UISlice.actions
export const { reducer: UIReducer } = UISlice
