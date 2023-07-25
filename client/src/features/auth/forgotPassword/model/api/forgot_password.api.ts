import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {ForgotParamsType, ForgotResponseType} from "@/features/auth/forgotPassword/model/types/types";


export const forgot_passwordApi = createApi({
    reducerPath: 'forgot_passwordApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://inctagram-api.fly.dev/'}),
    endpoints: (build) => {
        return {
            signUp: build.mutation<ForgotResponseType, ForgotParamsType>({
                query: (data) => ({
                    method: 'POST',
                    url: `auth/forgot_password`,
                    body: data,
                }),
            }),
        }
    },
})

export const {useForgot_passwordMutation} = forgot_passwordApi
