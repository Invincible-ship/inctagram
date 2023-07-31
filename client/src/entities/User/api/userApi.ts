import { rtkApi } from '@/shared/api/rtkApi'
import { USER_TAG } from '@/shared/const/rtk'
import {
  RegisterParamsType,
  RegisterResponseType,
} from '@/features/auth/signup/model/types/types'

export const userApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    signout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: [USER_TAG],
    }),
    signup: build.mutation<RegisterResponseType, RegisterParamsType>({
      query: data => ({
        method: 'POST',
        url: `auth/registration`,
        body: data,
      }),
    }),
  }),
})
