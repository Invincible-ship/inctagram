import { IProfile, getProfileDataQuery } from '@/entities/Profile'
import { setProfileData } from '@/entities/Profile'
import { getUserId } from '@/entities/User'
import { ThunkConfig } from '@/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError, FieldError } from '@/shared/api/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const initProfileDataThunk = createAsyncThunk<
  IProfile | undefined,
  void,
  ThunkConfig<string | FieldError[]>
>('profile/getProfileData', async (_, { dispatch, rejectWithValue, getState }) => {
  const id = getUserId(getState())

  try {
    if (id) {
      const profileData = await dispatch(getProfileDataQuery(id)).unwrap()

      dispatch(setProfileData(profileData))
    }
  } catch (err) {
    if (isFetchBaseQueryError(err)) {
      const apiError = err.data as ApiError

      console.warn(apiError.messages)
      return rejectWithValue(apiError.messages)
    }
  }
})
