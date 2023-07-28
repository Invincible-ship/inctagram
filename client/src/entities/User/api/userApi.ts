import { rtkApi } from "@/shared/api/rtkApi"
import { USER_TAG } from "@/shared/const/rtk"
import {LoginRequestType, LoginResponseType} from "@/features/auth/signIn/model/types/types"

export const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    signout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      }),
      invalidatesTags: [USER_TAG]
    }),
    signIn: build.mutation<LoginResponseType, LoginRequestType>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data
      })
    })
  })
})