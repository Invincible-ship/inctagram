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
  FORGOT_PASSWORD_ENDPOINT,
  CREATE_NEW_PASSWORD_ENDPOINT,
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
    // TODO: migrate signInWithGoogle to new backend api
    signInWithGoogle: build.mutation<TOAuthLoginResponse, string>({
      query: code => ({
        method: 'POST',
        url: SIGN_IN_WITH_GOOGLE_ENDPOINT,
        body: { code },
      }),
    }),
    // me migrated
    me: build.query<IUser, void>({
      query: () => ME_ENDPOINT,
      providesTags: [USER_TAG],
    }),

    forgotPassword: build.mutation<void, any>({
      query: body => {
        return {
          method: 'POST',
          url: FORGOT_PASSWORD_ENDPOINT,
          body,
        }
      },
    }),
    createNewPassword: build.mutation<void, any>({
      query: body => {
        return {
          method: 'POST',
          url: CREATE_NEW_PASSWORD_ENDPOINT,
          body,
        }
      },
    }),
    checkRecoveryCode: build.mutation<any, any>({
      query: body => {
        return {
          method: 'POST',
          url: '/api/v1/auth/check-recovery-code',
          body,
        }
      },
    }),
  }),
})

export const getUserDataByTokenQuery = userApi.endpoints.me.initiate
export const useMeLazyQuery = userApi.endpoints.me.useLazyQuery
export const getAccessTokenByGoogleMutation = userApi.endpoints.signInWithGoogle.initiate
export const {
  useCheckRecoveryCodeMutation,
  useResendLinkMutation,
  useConfirmationEmailViaCodeMutation,
  useMeQuery,
  useCreateNewPasswordMutation,
  useForgotPasswordMutation,
} = userApi
