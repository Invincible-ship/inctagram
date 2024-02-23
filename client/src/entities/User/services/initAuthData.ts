import { getUserDataByTokenQuery } from '../api/userApi'
import { IUser } from '../model/types/types'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const initAuthData = createAsyncThunk<IUser | undefined, void, ThunkConfig<string>>(
  'user/initUserData',
  async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi

    console.log('Start init data')

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

    if (!token) {
      return rejectWithValue('User unauthorized')
    }

    try {
      const user = await dispatch(getUserDataByTokenQuery()).unwrap()

      localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, JSON.stringify(user.userId))

      return user
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        if (typeof err.data == 'string') {
          throw new Error(err.data)
        }
      }
    }
  },
)
