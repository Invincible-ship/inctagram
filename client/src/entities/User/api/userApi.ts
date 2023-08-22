import { rtkApi } from '@/shared/api/rtkApi'
import { USER_TAG } from '@/shared/const/rtk'
import { LoginRequestType, LoginResponseType } from '@/features/auth/signIn/model/types/types'
import { RegisterParamsType, RegisterResponseType } from '@/features/auth/signup/model/types/types'
import { IUser } from '@/entities/User/model/types/types'
import {
  ForgotParamsType,
  ForgotResponseType,
} from '@/features/auth/forgotPassword/model/types/types'

export const userApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    signout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: [USER_TAG],
    }),
    forgotPassword: build.mutation<ForgotResponseType, ForgotParamsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/forgot-password',
        body: data,
      }),
    }),
    resetPassword: build.mutation<ForgotResponseType, ForgotParamsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/reset-password',
        body: data,
      }),
    }),
    signup: build.mutation<RegisterResponseType, RegisterParamsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/registration',
        body: data,
      }),
    }),
    signIn: build.mutation<LoginResponseType, LoginRequestType>({
      query: data => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [USER_TAG],
    }),
    me: build.query<IUser, void>({
      query: () => 'user/me',
    }),
  }),
})

export const getUserDataByTokenQuery = userApi.endpoints.me.initiate
