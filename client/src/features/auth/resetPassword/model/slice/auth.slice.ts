import { createSlice } from '@reduxjs/toolkit'
import { ResetPasswordSchema } from '../types/types'
import { resetPasswordThunk } from '@/features/auth/resetPassword/model/resetPassword'

const initialState: ResetPasswordSchema = {
  isLoading: false,
}

const slice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    dummyReducer: state => {
      return
    },
  },
  extraReducers: builder => {
    builder.addCase(resetPasswordThunk.pending, state => {
      state.isLoading = true
    })

    builder.addCase(resetPasswordThunk.fulfilled, state => {
      state.isLoading = false
    })

    builder.addCase(resetPasswordThunk.rejected, state => {
      state.isLoading = false
    })
  },
})

export const resetPasswordReducer = slice.reducer
