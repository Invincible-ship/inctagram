import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {RegisterParamsType, RegisterResponseType} from "@/features/auth/signup/model/types/types"


export const signUpApi = createApi({
    reducerPath: 'signUpApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://inctagram-api.fly.dev/'}),
    endpoints: (build) => {
        return {
            signUp: build.mutation<RegisterResponseType, RegisterParamsType>({
                query: (data) => ({
                    method: 'POST',
                    url: `auth/registration`,
                    body: data,
                }),
            }),
        }
    },
})

export const {useSignUpMutation} = signUpApi
