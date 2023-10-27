import { getAccessTokenByGoogleMutation } from '@/entities/User'
import { ThunkConfig } from '@/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { FieldError } from '@/shared/api/types'
import { Routes } from '@/shared/types/routes'

export const signInWithGoogleThunk = createAsyncThunk<
  void,
  string,
  ThunkConfig<FieldError[] | string>
>('auth/signInWithGoogle', async (code, { dispatch, rejectWithValue }) => {
  try {
    const accessTokenResponse = await dispatch(getAccessTokenByGoogleMutation(code)).unwrap()

    if (accessTokenResponse) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessTokenResponse.accessToken)

      window.location.assign(Routes.MAIN)
    }
  } catch (err) {
    if (isFetchBaseQueryError(err)) {
      const apiError = err.data as ApiError

      console.warn(apiError)
      return rejectWithValue(apiError.messages)
    }

    return rejectWithValue('Unknown Error!')
  }
})
