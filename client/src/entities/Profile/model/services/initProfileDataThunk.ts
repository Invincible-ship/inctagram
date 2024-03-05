import { getOwnerProfileDataQuery } from '../../api/profileApi'
import { IProfile } from '../types/types'
import { setProfileData } from '../slice/profileSlice'
import { getUserId } from '@/entities/User'
import { ThunkConfig } from '@/app/providers/StoreProvider'
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
      const profileData = await dispatch(getOwnerProfileDataQuery(id)).unwrap()

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
