import { rtkApi } from '@/shared/api/rtkApi'
import { USER_TAG } from '@/shared/const/rtk'
import { LoginRequestType, LoginResponseType } from '@/features/auth/signIn/model/types/types'
import { RegisterParamsType } from '@/features/auth/signup/model/types/types'
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
import { TConfirmationEmailViaCodeRequest } from '@/features/auth/confirmationEmailViaCode'
import { TResendLinkBody } from '@/features/auth/confirmationEmailViaCode/model/types'

export const userApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    // signout migrated
    signout: build.mutation<void, void>({
      query: () => ({
        url: SIGN_OUT_ENDPOINT,
        method: 'POST',
      }),
      invalidatesTags: [USER_TAG],
    }),
    // SignUp migrated
    signup: build.mutation<void, RegisterParamsType>({
      query: data => ({
        method: 'POST',
        url: SIGN_UP_ENDPOINT,
        body: data,
      }),
    }),
    // confirmationEmailViaCode migrated
    confirmationEmailViaCode: build.mutation<void, TConfirmationEmailViaCodeRequest>({
      query: body => ({
        method: 'POST',
        url: CONFIRMATION_REGISTRATION,
        body,
      }),
    }),
    // resendLink migrated
    resendLink: build.mutation<void, TResendLinkBody>({
      query: data => ({
        url: RESEND_LINK_ENDPOINT,
        method: 'POST',
        body: data,
      }),
    }),
    // signIn migrated
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
    // signInWithGithub migrated
    signInWithGithub: build.query<TOAuthLoginResponse, string>({
      query: code => ({
        url: SIGN_IN_WITH_GITHUB_ENDPOINT,
        params: { code },
      }),
    }),
    // me migrated
    me: build.query<IUser, void>({
      query: () => ME_ENDPOINT,
      providesTags: [USER_TAG],
    }),
  }),
})

export const getUserDataByTokenQuery = userApi.endpoints.me.initiate
export const getUserDataByGithubQuery = userApi.endpoints.signInWithGithub.initiate
export const useMeLazyQuery = userApi.endpoints.me.useLazyQuery
export const {
  useSignInWithGoogleQuery,
  useSignInWithGithubQuery,
  useResendLinkMutation,
  useConfirmationEmailViaCodeMutation,
  useMeQuery,
} = userApi
