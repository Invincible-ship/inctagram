import { getAccessTokenByGoogleMutation } from '@/entities/User'
import { ThunkConfig } from '@/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage'
import { Routes } from '@/shared/types/routes'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { redirect } from 'next/navigation'
import { FieldError } from '@/shared/api/types'

export const signInWithGoogleThunk = createAsyncThunk<
  void,
  string,
  ThunkConfig<FieldError[] | string>
>('auth/signInWithGoogle', async (code, { dispatch, rejectWithValue }) => {
  try {
    const accessTokenResponse = await dispatch(getAccessTokenByGoogleMutation(code)).unwrap()

    if (accessTokenResponse) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessTokenResponse.accessToken)

      redirect(Routes.MAIN)
    }
  } catch (err) {
    if (isFetchBaseQueryError(err)) {
      const apiError = err.data as ApiError

      console.warn(apiError.messages)
      return rejectWithValue(apiError.messages)
    }

    return rejectWithValue('Unknown Error!')
  }
})
