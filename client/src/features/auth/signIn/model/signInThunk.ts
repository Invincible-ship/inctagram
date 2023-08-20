import { createAsyncThunk } from '@reduxjs/toolkit'
import { userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { LoginRequestType, LoginResponseType } from '@/features/auth/signIn/model/types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'

export const signInThunk = createAsyncThunk<
  LoginResponseType,
  LoginRequestType,
  ThunkConfig<string>
>('auth/login', async (body, { dispatch }) => {
  try {
    const response = await dispatch(userApi.endpoints.signIn.initiate(body)).unwrap()
    if (response) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.accessToken)
      localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, response.user.id)
    }

    return response
  } catch (error) {
    if (isFetchBaseQueryError(error)) {
      if (typeof error.data === 'string') {
        throw new Error(error.data)
      }
    }
    throw new Error('Unknown error')
  }
})
