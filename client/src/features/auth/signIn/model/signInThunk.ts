import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAuthData, userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { LoginRequestType } from './types/types'
import { ThunkConfig } from '@/providers/StoreProvider'

export const signInThunk = createAsyncThunk<void, LoginRequestType, ThunkConfig<string>>(
  'auth/login',
  async (body, { dispatch }) => {
    try {
      const response = await dispatch(userApi.endpoints.signIn.initiate(body)).unwrap()

      if (response) {
        dispatch(setAuthData(response))
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
          throw new Error(error.data)
        }
      }
      throw new Error('Unknown error')
    }
  },
)
