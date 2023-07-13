import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {LoginRequestType, LoginResponseType} from "@/features/auth/signIn/model/types/types"

const baseUrl = "https://inctagram-api.fly.dev"

export const signInApi = createApi({
  reducerPath: "signInApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  endpoints: (build) => {
    return {
      signIn: build.mutation<LoginResponseType, LoginRequestType>({
          query: (data) => {
            return {
              method: 'POST',
              url: '/auth/login',
              body: data
            }
          }
        }
      )
    }
  }
})

export const {useSignInMutation} = signInApi