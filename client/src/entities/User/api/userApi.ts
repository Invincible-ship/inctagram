import { rtkApi } from "@/shared/api/rtkApi"
import { USER_TAG } from "@/shared/const/rtk"

export const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    signout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      }),
      invalidatesTags: [USER_TAG]
    }),
  })
})