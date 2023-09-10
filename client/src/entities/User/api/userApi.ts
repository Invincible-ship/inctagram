import { rtkApi } from '@/shared/api/rtkApi'
import { USER_TAG } from '@/shared/const/rtk'
import { LoginRequestType, LoginResponseType } from '@/features/auth/signIn/model/types/types'
import { RegisterParamsType, RegisterResponseType } from '@/features/auth/signup/model/types/types'
import { IUser } from '@/entities/User/model/types/types'
import {
  ME_ENDPOINT,
  RESEND_LINK_ENDPOINT,
  SIGN_IN_ENDPOINT,
  SIGN_IN_WITH_GITHUB_ENDPOINT,
  SIGN_IN_WITH_GOOGLE_ENDPOINT,
  SIGN_OUT_ENDPOINT,
  SIGN_UP_ENDPOINT,
  CONFIRMATION_REGISTRATION,
} from '@/shared/const/apiEndpoints'
import { TOAuthLoginResponse } from '@/features/auth/signInWithThirdPartyServices'
import {
  TConfirmationEmailViaCodeRequest,
  TConfirmationEmailViaCodeResponse,
} from '@/features/auth/confirmationEmailViaCode'

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
    confirmationEmailViaCode: build.query<
      TConfirmationEmailViaCodeResponse,
      TConfirmationEmailViaCodeRequest
    >({
      query: confirmationCode => ({
        url: CONFIRMATION_REGISTRATION,
        params: { confirmationCode },
      }),
    }),
    resendLink: build.mutation<void, { email: string }>({
      query: data => ({
        url: RESEND_LINK_ENDPOINT,
        method: 'POST',
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
    signInWithGoogle: build.query<TOAuthLoginResponse, string>({
      query: code => ({
        url: SIGN_IN_WITH_GOOGLE_ENDPOINT,
        params: { code },
      }),
    }),
    signInWithGithub: build.query<TOAuthLoginResponse, string>({
      query: code => ({
        url: SIGN_IN_WITH_GITHUB_ENDPOINT,
        params: { code },
      }),
    }),
    me: build.query<IUser, void>({
      query: () => ME_ENDPOINT,
      providesTags: [USER_TAG],
    }),
  }),
})

export const getUserDataByTokenQuery = userApi.endpoints.me.initiate
export const getUserDataByGithubQuery = userApi.endpoints.signInWithGithub.initiate
export const {
  useSignInWithGoogleQuery,
  useSignInWithGithubQuery,
  useResendLinkMutation,
  useConfirmationEmailViaCodeQuery,
} = userApi
