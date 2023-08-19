import { rtkApi } from '@/shared/api/rtkApi'
import { USER_TAG } from '@/shared/const/rtk'
import { LoginRequestType, LoginResponseType } from '@/features/auth/signIn/model/types/types'
import {
  RegisterParamsType,
  RegisterResponseType,
  ResendLinkParamsType,
} from '@/features/auth/signup/model/types/types'

const endpoints = {
  baseUrl: 'https://inctagram-api.fly.dev/',
  registration: 'auth/registration',
  resendEmail: 'auth/confirmation-email-resending',
}

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
    //* request for ResendLink component
    emailResending: build.mutation<void, ResendLinkParamsType>({
      query: body => ({
        url: endpoints.resendEmail,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useEmailResendingMutation } = userApi
