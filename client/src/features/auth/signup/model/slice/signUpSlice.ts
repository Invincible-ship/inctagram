import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { signupThunk } from '@/features/auth/signup/model/signup'
import { ISignUpSchema } from '../types/types'

const initialState: ISignUpSchema = {
  isLoading: false,
  isSignUpModalOpen: false,
}

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    dummyReducer: state => {
      return
    },
    setIsSignUpModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isSignUpModalOpen = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(signupThunk.pending, state => {
      state.isLoading = true
    })

    builder.addCase(signupThunk.fulfilled, state => {
      state.isLoading = false
      state.isSignUpModalOpen = true
    })

    builder.addCase(signupThunk.rejected, state => {
      state.isLoading = false
      state.isSignUpModalOpen = true
    })
  },
})

export const signupReducer = signUpSlice.reducer
export const { setIsSignUpModalOpen } = signUpSlice.actions
