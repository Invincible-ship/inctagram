import { createAsyncThunk } from '@reduxjs/toolkit'
import { ForgotParamsType } from './types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { UseFormSetError } from 'react-hook-form'
import { isHookFormError } from '@/shared/api/isHookFormError'

type ForgotPasswordThunkPayload = {
  body: ForgotParamsType
  setError: UseFormSetError<ForgotParamsType>
}

export const forgotPasswordThunk = createAsyncThunk<
  void,
  ForgotPasswordThunkPayload,
  ThunkConfig<string>
>('FORGOT_PASSWORD_ENDPOINT', async ({ body, setError }, thunkAPI) => {})
