import { AuthRefreshResponse } from '@/shared/api/types'
import { LOCAL_STORAGE_LANGUAGE_ID_KEY, LOCAL_STORAGE_TOKEN_KEY } from '../const/localStorage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { USER_TAG } from '@/shared/const/rtk'
import { REFRESH_TOKEN_ENDPOINT } from '@/shared/const/apiEndpoints'

const baseUrl = __IS_DEV__ ? process.env.NEXT_PUBLIC_LOCALHOST_API : process.env.NEXT_PUBLIC_API

const baseQuery = fetchBaseQuery({
  baseUrl,
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
  credentials: 'include',
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshResult = (await baseQuery(REFRESH_TOKEN_ENDPOINT, api, extraOptions)) as {
      data: AuthRefreshResponse
    }

    if (refreshResult.data) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, refreshResult.data.accessToken)
      result = await baseQuery(args, api, extraOptions)
    } else {
      // api.dispatch(signoutThunk())
      console.warn(result.error)
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
