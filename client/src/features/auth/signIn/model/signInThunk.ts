import { createAsyncThunk } from '@reduxjs/toolkit'
import { userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { LoginRequestType } from './types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage'
import { ApiError } from '@/shared/api/types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { UseFormSetError } from 'react-hook-form'

type SignInThunkPayload = {
  body: LoginRequestType
  setError: UseFormSetError<LoginRequestType>
}

export const signInThunk = createAsyncThunk<
  void,
  SignInThunkPayload & { router: AppRouterInstance },
  ThunkConfig<string>
>('auth/login', async ({ body, router, setError }, { dispatch, rejectWithValue }) => {
  try {
    const accessTokenResponse = await dispatch(userApi.endpoints.signIn.initiate(body)).unwrap()

    if (accessTokenResponse) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessTokenResponse.accessToken)
      return router.refresh()
    }
  } catch (error) {
    if (isFetchBaseQueryError(error)) {
      const apiError = error.data as ApiError
      if (Array.isArray(apiError.messages)) {
        apiError.messages.forEach(err =>
          setError(err.field as keyof LoginRequestType, {
            type: 'server',
            message: err.message,
          }),
        )
      }
    }
    return rejectWithValue('Unknown error')
  }
})
