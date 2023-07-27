import { RegisterParamsType, RegisterResponseType } from "@/features/auth/signup/model/types/types"
import { rtkApi } from "@/shared/api/rtkApi"

const endpoints = {
  baseUrl: 'https://inctagram-api.fly.dev/',
  registration: 'auth/registration',
  resendEmail: 'auth/confirmation-email-resending',
}

export const signUpApi = rtkApi.injectEndpoints({
  endpoints: (build) => {
    return {
      signUp: build.mutation<RegisterResponseType, RegisterParamsType>({
        query: (data) => ({
          method: 'POST',
          url: endpoints.registration,
          body: data,
        })
      }),
      //* request for ResendLink component
      emailResending: build.mutation<any, any>({
        query: (body: { email: string }) => ({
          url: endpoints.resendEmail,
          method: 'POST',
          body
        })
      }),
    }
  },
})

export const {
  useSignUpMutation,
  useEmailResendingMutation
} = signUpApi

