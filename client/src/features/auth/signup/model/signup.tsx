import { createAsyncThunk } from '@reduxjs/toolkit'
import { RegisterParamsType } from './types/types'
import { ThunkConfig } from '@/providers/StoreProvider'
import { userApi } from '@/entities/User'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { UseFormSetError } from 'react-hook-form'
import { isHookFormError } from '@/shared/api/isHookFormError'
import { redirect } from 'next/navigation'
import { LanguageIds } from '@/shared/config/i18n/types'
import { Routes } from '@/shared/types/routes'

type SignupThunkPayload = {
  body: RegisterParamsType
  setError: UseFormSetError<RegisterParamsType>
  lngId: LanguageIds
}

export const signupThunk = createAsyncThunk<void, SignupThunkPayload, ThunkConfig<string>>(
  'auth/signup',
  async ({ body, setError, lngId }, thunkAPI) => {
    try {
      await thunkAPI.dispatch(userApi.endpoints.signup.initiate(body)).unwrap()
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (error.status == 400) {
          redirect(`/${lngId}${Routes.MERGE}`)
        }
      }

      if (isHookFormError<RegisterParamsType>(error)) {
        for (const err of error.data.errors) {
          setError(err.field, {
            type: 'server',
            message: err.message,
          })
        }
      }

      return thunkAPI.rejectWithValue('Unknown error')
    }
  },
)
