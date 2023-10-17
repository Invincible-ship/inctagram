import { createAsyncThunk } from '@reduxjs/toolkit'
import { RegisterParamsType } from './types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/shared/api/types'

type SignupThunkPayload = {
  body: RegisterParamsType
  setError: UseFormSetError<RegisterParamsType>
}

export const signupThunk = createAsyncThunk<void, SignupThunkPayload, ThunkConfig<string>>(
  'auth/signup',
  async ({ body, setError }, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(userApi.endpoints.signup.initiate(body)).unwrap()
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const apiError = error.data as ApiError

        if (Array.isArray(apiError.messages)) {
          apiError.messages.forEach(err =>
            setError(err.field as keyof RegisterParamsType, {
              type: 'server',
              message: err.message,
            }),
          )
        }
      }

      return rejectWithValue('Unknown error')
    }
  },
)
