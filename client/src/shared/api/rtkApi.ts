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
  console.log('RTK api result: ', JSON.stringify(result, null, 2))
  console.log('RTK api error: ', JSON.stringify(result.error, null, 2))

  if (result.error && result.error.originalStatus === 401) {
    console.log('401 error: ', JSON.stringify(result.error, null, 2))

    const refreshResult = (await baseQuery(REFRESH_TOKEN_ENDPOINT, api, extraOptions)) as {
      data: AuthRefreshResponse
    }
    console.log('Refresh token result: ', JSON.stringify(refreshResult, null, 2))

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
