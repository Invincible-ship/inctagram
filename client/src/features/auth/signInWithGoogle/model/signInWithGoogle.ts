import { getUserDataByGoogleQuery, setAuthData } from '@/entities/User'
import { TGoogleLoginBody } from './types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { Routes } from '@/shared/types/routes'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'

export const signInWithGoogle = createAsyncThunk<void, TGoogleLoginBody, ThunkConfig<string>>(
  'auth/signInWithGoogle',
  async ({ code, lngId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(getUserDataByGoogleQuery(code)).unwrap()

      if (response) {
        dispatch(setAuthData(response))
        redirect(`${lngId}${Routes.PROFILE}`, RedirectType.replace)
      }
    } catch (err) {
      console.warn('Error in google authorization request!')

      if (isFetchBaseQueryError(err)) {
        // FIXME: this error has to handle on backend and automatic redirects on the client main page!
        if (err.status == 400) {
          redirect(`/${lngId}${Routes.MAIN}`, RedirectType.replace)
        }
      }

      return rejectWithValue('Unexpected error!')
    }
  },
)
