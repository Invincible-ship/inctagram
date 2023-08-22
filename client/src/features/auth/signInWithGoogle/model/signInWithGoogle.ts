import { getGoogleParams } from './util/getGoogleParams'
import { ThunkConfig } from '@/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { GOOGLE_ENDPOINT } from '@/shared/const/apiEndpoints'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const signInWithGoogle = createAsyncThunk<void, void, ThunkConfig<unknown>>(
  'auth/google',
  (_, { extra, rejectWithValue }) => {
    const params = getGoogleParams()

    try {
      extra.api.get(`${GOOGLE_ENDPOINT}?${params}`)
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        return rejectWithValue(err.data)
      }
    }
  },
)
