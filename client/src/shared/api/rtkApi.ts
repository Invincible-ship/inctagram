import { AuthRefreshResponse } from '@/shared/api/types'
import { LOCAL_STORAGE_TOKEN_KEY } from '../const/localStorage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery(
  {
    baseUrl: process.env.__API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }
)

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/refresh-token', api, extraOptions) as { data: AuthRefreshResponse }

    if (refreshResult.data) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, refreshResult.data.accessToken)
      result = await baseQuery(args, api, extraOptions)
    } else {
      // TODO: add loggedOut
      throw result.error
    }
  }

  return result
}

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({})
})