import { AuthRefreshResponse } from '@/shared/api/types'
import {
  LOCAL_STORAGE_LANGUAGE_ID_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from '../const/localStorage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { USER_TAG } from '@/shared/const/rtk'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
  prepareHeaders: headers => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    const languageId = localStorage.getItem(LOCAL_STORAGE_LANGUAGE_ID_KEY)

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    if (languageId) {
      headers.set('accept-language', languageId)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
    > = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshResult = (await baseQuery(
        '/refresh-token',
        api,
        extraOptions,
    )) as { data: AuthRefreshResponse }

    if (refreshResult.data) {
      localStorage.setItem(
          LOCAL_STORAGE_TOKEN_KEY,
          refreshResult.data.accessToken,
      )
      result = await baseQuery(args, api, extraOptions)
    } else {
      // api.dispatch(signoutThunk())
    }
  }

  return result
}

export const rtkApi = createApi({
  tagTypes: [USER_TAG],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({}),
})