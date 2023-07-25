import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {ResetPasswordParamsType, ResetPasswordResponseType} from "@/features/auth/resetPassword/model/types/types";


export const reset_passwordApi = createApi({
    reducerPath: 'reset_passwordApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://inctagram-api.fly.dev/'}),
    endpoints: (build) => {
        return {
            signUp: build.mutation<ResetPasswordResponseType, ResetPasswordParamsType>({
                query: (data) => ({
                    method: 'POST',
                    url: `auth/reset_password`,
                    body: data,
                }),
            }),
        }
    },
})

export const {useReset_passwordMutation} = reset_passwordApi
