import { signInWithGoogleThunk } from '../signInWithGoogleThunk'
import { ISignInWithGoogleSchema } from '../types/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ISignInWithGoogleSchema = {
  isLoading: false,
}

const signInWithGoogleSlice = createSlice({
  name: 'signInWithGoogle',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signInWithGoogleThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(signInWithGoogleThunk.rejected, state => {
        state.isLoading = false
      })
  },
})

export const signInWithGoogleReducer = signInWithGoogleSlice.reducer
