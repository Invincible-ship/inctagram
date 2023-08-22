import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResetPasswordParamsType } from './types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { UseFormSetError } from 'react-hook-form'
import { isHookFormError } from '@/shared/api/isHookFormError'

type ResetPasswordThunkPayload = {
  body: ResetPasswordParamsType
  setError: UseFormSetError<ResetPasswordParamsType>
}

export const resetPasswordThunk = createAsyncThunk<
  void,
  ResetPasswordThunkPayload,
  ThunkConfig<string>
>('auth/reset-password', async ({ body, setError }, thunkAPI) => {})
