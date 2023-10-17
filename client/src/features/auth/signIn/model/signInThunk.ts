import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAuthData, userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { LoginRequestType } from './types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage'
import { ApiError } from '@/shared/api/types'
import toast from 'react-hot-toast'

export const signInThunk = createAsyncThunk<void, LoginRequestType, ThunkConfig<string>>(
  'auth/login',
  async (requestData, { dispatch }) => {
    try {
      const accessTokenResponse = await dispatch(
        userApi.endpoints.signIn.initiate(requestData),
      ).unwrap()

      if (accessTokenResponse) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessTokenResponse.accessToken)
      }

      const user = await dispatch(userApi.endpoints.me.initiate()).unwrap()

      if (user) dispatch(setAuthData(user))
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const apiError = error.data as ApiError
        toast.error(apiError.error)
      }
      throw new Error('Unknown error')
    }
  },
)
