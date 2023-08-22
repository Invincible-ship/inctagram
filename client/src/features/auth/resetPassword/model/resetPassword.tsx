import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResetPasswordParamsType } from './types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { UseFormSetError } from 'react-hook-form'
import { isHookFormError } from '@/shared/api/isHookFormError'

type ForgotPasswordThunkPayload = {
  body: ResetPasswordParamsType
  setError: UseFormSetError<ResetPasswordParamsType>
}

export const resetPasswordThunk = createAsyncThunk<
  void,
  ForgotPasswordThunkPayload,
  ThunkConfig<string>
>('auth/reset-password', async ({ body, setError }, thunkAPI) => {
  try {
    await thunkAPI.dispatch(userApi.endpoints.resetPassword.initiate(body)).unwrap()
  } catch (error) {
    if (isFetchBaseQueryError(error)) {
      if (typeof error.data === 'string') {
        throw new Error(error.data)
      }
    }

    if (isHookFormError<ResetPasswordParamsType>(error)) {
      for (const err of error.data.errors) {
        setError(err.field, {
          type: 'server',
          message: err.message,
        })
      }
    }

    return thunkAPI.rejectWithValue('Unknown error')
  }
})
