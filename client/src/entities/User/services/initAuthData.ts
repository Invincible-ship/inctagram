import { getUserDataByIdQuery } from '../api/userApi'
import { IUser } from '../model/types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const initAuthData = createAsyncThunk<IUser | undefined, void, ThunkConfig<string>>(
  'user/initUserData',
  async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY) as string

    if (!token || !userId) rejectWithValue('User unauthorized')

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap()

      return response
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        if (typeof err.data == 'string') {
          throw new Error(err.data)
        }
      }
    }
  },
)
