import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { signupThunk } from '../signup'
import { ErrorType, ISignUpSchema } from '../types/types'
import { FormSchemaType } from '../../lib/validationConstants/validationConstants'

const initialState: ISignUpSchema = {
  defaultValues: undefined,
  errorType: undefined,
  isLoading: false,
  isConfirmationModalOpen: false,
  isErrorModalOpen: false,
}

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setIsConfirmationModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isConfirmationModalOpen = payload
    },
    setIsErrorModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isErrorModalOpen = payload
    },
    setErrorType: (state, { payload }: PayloadAction<ErrorType | undefined>) => {
      state.errorType = payload
    },
    setDefaultFormValues: (state, { payload }: PayloadAction<FormSchemaType>) => {
      state.defaultValues = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(signupThunk.pending, state => {
      state.isLoading = true
    })

    builder.addCase(signupThunk.fulfilled, state => {
      state.isLoading = false
      state.isConfirmationModalOpen = true
    })

    builder.addCase(signupThunk.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isErrorModalOpen = true
    })
  },
})

export const signupReducer = signUpSlice.reducer
export const {
  setIsConfirmationModalOpen,
  setIsErrorModalOpen,
  setErrorType,
  setDefaultFormValues,
} = signUpSlice.actions
