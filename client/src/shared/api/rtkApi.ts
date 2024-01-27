import { AuthRefreshResponse } from '@/shared/api/types'
import { LOCAL_STORAGE_LANGUAGE_ID_KEY, LOCAL_STORAGE_TOKEN_KEY } from '../const/localStorage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { POST_TAG, PROFILE_TAG, USER_TAG } from '@/shared/const/rtk'
import { UPDATE_TOKENS_ENDPOINT } from '@/shared/const/apiEndpoints'
import { signoutThunk } from '@/features/auth/signout'

// const baseUrl = __IS_DEV__ ? process.env.NEXT_PUBLIC_LOCALHOST_API : process.env.NEXT_PUBLIC_API

const baseUrl = process.env.NEXT_PUBLIC_API

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
  // if (__IS_DEV__) {
  //   console.log('RTK api result: ', JSON.stringify(result, null, 2))
  //   console.log('RTK api error: ', JSON.stringify(result.error, null, 2))
  //   console.log('RTK api error status: ', JSON.stringify(result.error?.status, null, 2))
  // }

  if (result.error && result.error.status === 401) {
    // __IS_DEV__ && console.log('401 error: ', JSON.stringify(result.error, null, 2))

    const refreshResult = (await baseQuery(
      { method: 'POST', url: UPDATE_TOKENS_ENDPOINT },
      api,
      extraOptions,
    )) as {
      data: AuthRefreshResponse
    }
    // __IS_DEV__ && console.log('Refresh token result: ', JSON.stringify(refreshResult, null, 2))

    if (refreshResult.data) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, refreshResult.data.accessToken)
      result = await baseQuery(args, api, extraOptions)
    } else {
      // if (api) api.dispatch(signoutThunk())
    }
  }

  return result
}

export const rtkApi = createApi({
  tagTypes: [USER_TAG, PROFILE_TAG, POST_TAG],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({}),
})
