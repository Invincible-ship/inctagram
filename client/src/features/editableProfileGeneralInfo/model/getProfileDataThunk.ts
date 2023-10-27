import { getProfileDataByIdQuery } from '@/entities/Profile'
import { setProfileData } from '@/entities/Profile'
import { ThunkConfig } from '@/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError, FieldError } from '@/shared/api/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getProfileDataThunk = createAsyncThunk<
  void,
  number,
  ThunkConfig<string | FieldError[]>
>('profile/getProfileData', async (id, { dispatch, rejectWithValue }) => {
  try {
    const profileData = await dispatch(getProfileDataByIdQuery(id)).unwrap()
    console.log('getProfileDataThunk response: ', profileData)

    if (profileData) dispatch(setProfileData(profileData))
  } catch (err) {
    if (isFetchBaseQueryError(err)) {
      const apiError = err.data as ApiError

      console.warn(apiError.messages)
      return rejectWithValue(apiError.messages)
    }
  }
})
