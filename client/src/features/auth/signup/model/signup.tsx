import { createAsyncThunk } from '@reduxjs/toolkit'
import { RegisterParamsType } from './types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { UseFormSetError } from 'react-hook-form'
import { isHookFormError } from '@/shared/api/isHookFormError'

type SignupThunkPayload = {
  body: RegisterParamsType
  setError: UseFormSetError<RegisterParamsType>
}

export const signupThunk = createAsyncThunk<void, SignupThunkPayload, ThunkConfig<string>>(
  'auth/signup',
  async ({ body, setError }, thunkAPI) => {
    try {
      await thunkAPI.dispatch(userApi.endpoints.signup.initiate(body)).unwrap()
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
          throw new Error(error.data)
        }
      }

      if (isHookFormError<RegisterParamsType>(error)) {
        for (const err of error.data.errors) {
          setError(err.field, {
            type: 'server',
            message: err.message,
          })
        }
      }

      return thunkAPI.rejectWithValue('Unknown error')
    }
  },
)
