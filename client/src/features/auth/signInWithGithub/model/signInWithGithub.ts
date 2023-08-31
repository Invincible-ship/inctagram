import { getUserDataByGithubQuery, setAuthData } from '@/entities/User'
import { TGithubLoginBody } from './types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { Routes } from '@/shared/types/routes'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'

export const signInWithGithub = createAsyncThunk<void, TGithubLoginBody, ThunkConfig<string>>(
  'auth/signInWithGithub',
  async ({ code, lngId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(getUserDataByGithubQuery(code)).unwrap()

      if (response) {
        dispatch(setAuthData(response))

        response.isAuth
          ? redirect(`${lngId}${Routes.MAIN}`, RedirectType.replace)
          : redirect(`${lngId}${Routes.PROFILE}`, RedirectType.replace)
      }
    } catch (err) {
      console.warn('Error in github authorization request!')

      if (isFetchBaseQueryError(err)) {
        if (err.status == 400) {
          redirect(`/${lngId}${Routes.MERGE}`, RedirectType.replace)
        }
      }

      return rejectWithValue('Unexpected error!')
    }
  },
)
