import { ThunkConfig } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearAuthData, userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { revalidateDataByTag } from '@/shared/lib/serverActions/revalidateDataByTag'
import { VIEWER_TAG } from '@/shared/const/rtk'

export const signoutThunk = createAsyncThunk<void, void, ThunkConfig<string>>(
  'auth/logout',
  async (_, { dispatch }) => {
    dispatch(clearAuthData())

    try {
      await dispatch(userApi.endpoints.signout.initiate()).unwrap()
      revalidateDataByTag(VIEWER_TAG)
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const apiError = error.data as ApiError

        if (Array.isArray(apiError.messages)) {
          apiError.messages.forEach(({ message }) => console.warn(message))
        }
        console.warn(apiError.messages)
      }

      throw new Error('Unknown error')
    }
  },
)
