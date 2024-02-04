import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { signInThunk } from '@/features/auth/signIn/model/signInThunk'
import { ErrorType, ISignInSchema } from '../types/types'

const initialState: ISignInSchema = {
  errorType: undefined,
  isErrorModalOpen: false,
  isLoading: false,
  error: false,
}

const slice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setDisableError(state) {
      state.error = false
    },
    setIsErrorModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isErrorModalOpen = payload
    },
    setErrorType: (state, { payload }: PayloadAction<ErrorType | undefined>) => {
      state.errorType = payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInThunk.fulfilled, state => {
        state.isLoading = false
      })
      .addCase(signInThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(signInThunk.rejected, state => {
        state.isLoading = false
        state.error = true
      })
  },
})

export const signInReducer = slice.reducer
export const { setDisableError, setIsErrorModalOpen, setErrorType } = slice.actions
