import { createSlice } from '@reduxjs/toolkit'
import { ForgotPasswordSchema } from '../types/types'
import { forgotPasswordThunk } from '@/features/auth/forgotPassword/model/forgotPassword'

const initialState: ForgotPasswordSchema = {
  isLoading: false,
}

const slice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    dummyReducer: state => {
      return
    },
  },
  extraReducers: builder => {
    builder.addCase(forgotPasswordThunk.pending, state => {
      state.isLoading = true
    })

    builder.addCase(forgotPasswordThunk.fulfilled, state => {
      state.isLoading = false
    })

    builder.addCase(forgotPasswordThunk.rejected, state => {
      state.isLoading = false
    })
  },
})

export const forgotPasswordReducer = slice.reducer
