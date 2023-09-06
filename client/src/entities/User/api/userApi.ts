import { rtkApi } from '@/shared/api/rtkApi'
import { USER_TAG } from '@/shared/const/rtk'
import { LoginRequestType, LoginResponseType } from '@/features/auth/signIn/model/types/types'
import {
  RegisterParamsType,
  RegisterResponseType,
  ResendLinkParamsType,
} from '@/features/auth/signup/model/types/types'
import { IUser } from '@/entities/User/model/types/types'
import {
  ME_ENDPOINT,
  SIGN_IN_ENDPOINT,
  SIGN_IN_WITH_GITHUB_ENDPOINT,
  SIGN_IN_WITH_GOOGLE_ENDPOINT,
  SIGN_OUT_ENDPOINT,
  SIGN_UP_ENDPOINT,
} from '@/shared/const/apiEndpoints'
import { TGoogleLoginResponse } from '@/features/auth/signInWithGoogle/model/types'
import { TGithubLoginResponse } from '@/features/auth/signInWithGithub'

export const userApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    signout: build.mutation<void, void>({
      query: () => ({
        url: SIGN_OUT_ENDPOINT,
        method: 'POST',
      }),
      invalidatesTags: [USER_TAG],
    }),
    signup: build.mutation<RegisterResponseType, RegisterParamsType>({
      query: data => ({
        method: 'POST',
        url: SIGN_UP_ENDPOINT,
        body: data,
      }),
    }),
    signIn: build.mutation<LoginResponseType, LoginRequestType>({
      query: data => ({
        url: SIGN_IN_ENDPOINT,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [USER_TAG],
    }),
    signInWithGoogle: build.query<TGoogleLoginResponse, string>({
      query: code => ({
        url: SIGN_IN_WITH_GOOGLE_ENDPOINT,
        params: { code },
      }),
    }),
    signInWithGithub: build.query<TGithubLoginResponse, string>({
      query: code => ({
        url: SIGN_IN_WITH_GITHUB_ENDPOINT,
        params: { code },
      }),
    }),
    me: build.query<IUser, void>({
      query: () => ME_ENDPOINT,
      providesTags: [USER_TAG],
    }),
    //* request for ResendLink component
    emailResending: build.mutation<void, ResendLinkParamsType>({
      query: body => ({
        url: 'auth/confirmation-email-resending',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const getUserDataByTokenQuery = userApi.endpoints.me.initiate

export const getUserDataByGoogleQuery = userApi.endpoints.signInWithGoogle.initiate
export const getUserDataByGithubQuery = userApi.endpoints.signInWithGithub.initiate
export const useEmailResendingMutation = userApi.endpoints.emailResending.initiate

//export const { useEmailResendingMutation } = userApi
