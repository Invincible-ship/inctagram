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
  async ({ code, lngId, router }, { dispatch, rejectWithValue }) => {
    console.log('Code: ', code)

    try {
      const response = await dispatch(getUserDataByGoogleQuery(code)).unwrap()

      if (response) {
        dispatch(setAuthData(response))

        response.isAuth
          ? redirect(`${lngId}${Routes.MAIN}`, RedirectType.replace)
          : redirect(`${lngId}${Routes.PROFILE}`, RedirectType.replace)
      }
    } catch (err) {
      console.warn(err)

      if (isFetchBaseQueryError(err)) {
        if (err.status == 400) {
          // redirect(`/${lngId}${Routes.MERGE}`, RedirectType.replace)
          return router.replace(`/${lngId}${Routes.MERGE}`)
        }
      }

      return rejectWithValue('Unexpected error!')
    }
  },
)
