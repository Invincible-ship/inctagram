import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {LoginRequestType} from "@/features/auth/signin/model/types/types"

const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://inctagram-api.fly.dev', credentials: "include"}),
  endpoints: (build) => {
    return {
      login: build.mutation<any, any>({
        query: (args: LoginRequestType) => {
          return {
            method: 'POST',
            url: "auth/login",
            body: {
              args
            }
          }
        }
      })
    }
  }
})

export default loginApi
