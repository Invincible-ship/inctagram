import { getAccessTokenByGoogleMutation } from '@/entities/User'
import { ThunkConfig } from '@/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { FieldError } from '@/shared/api/types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export const signInWithGoogleThunk = createAsyncThunk<
  void,
  { code: string; router: AppRouterInstance },
  ThunkConfig<FieldError[] | string>
>('auth/signInWithGoogle', async ({ code, router }, { dispatch, rejectWithValue }) => {
  try {
    const accessTokenResponse = await dispatch(getAccessTokenByGoogleMutation(code)).unwrap()

    if (accessTokenResponse) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessTokenResponse.accessToken)

      return router.refresh()
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
