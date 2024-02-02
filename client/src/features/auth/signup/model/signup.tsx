import { createAsyncThunk } from '@reduxjs/toolkit'
import { RegisterParamsType } from './types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { UseFormReset, UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/shared/api/types'
import { setErrorType, setIsErrorModalOpen } from './slice/signUpSlice'
import { FormSchemaType } from '../lib/validationConstants/validationConstants'

type SignupThunkPayload = {
  body: RegisterParamsType
  setError: UseFormSetError<FormSchemaType>
  resetForm: UseFormReset<FormSchemaType>
}

export const signupThunk = createAsyncThunk<void, SignupThunkPayload, ThunkConfig<string>>(
  'auth/signup',
  async ({ body, setError, resetForm }, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(userApi.endpoints.signup.initiate(body)).unwrap()
      resetForm()
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const apiError = error.data as ApiError

        if (Array.isArray(apiError.messages)) {
          apiError.messages.forEach(err => {
            if (err.field === 'email') {
              dispatch(setIsErrorModalOpen(true))
              dispatch(setErrorType('existedEmail'))
            }

            setError(err.field as keyof RegisterParamsType, {
              type: 'server',
              message: err.message,
            })
          })
        }

        return rejectWithValue('')
      }
    }
  },
)
