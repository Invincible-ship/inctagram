import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {LoginRequestType, LoginResponseType} from "@/features/auth/signin/model/types/types"
import {AuthInstance} from "@/features/auth/auth.instance"

const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://inctagram-api.fly.dev'}),
  endpoints: (build) => {
    return {
      login: build.query<any, any>({
        query: (args: LoginRequestType) => {
          return {
            method: 'POST',
            url: "auth/login",
            params: {
              login: args
            }
          }
        }
      })
    }
  }
})

export default loginApi
