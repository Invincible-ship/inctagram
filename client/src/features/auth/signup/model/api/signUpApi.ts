import {RegisterParamsType, RegisterResponseType} from "@/features/auth/signup/model/types/types"
import {rtkApi} from "@/shared/api/rtkApi";


export const signUpApi = rtkApi.injectEndpoints({
    endpoints: (build) => {
        return {
            signUp: build.mutation<RegisterResponseType, RegisterParamsType>({
                query: (data) => ({
                    method: 'POST',
                    url: `auth/registration`,
                    body: data,
                })
            }),
        }
    },
})

export const {useSignUpMutation} = signUpApi

