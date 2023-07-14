import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterParamsType, RegisterResponseType } from "@/features/auth/signup/model/types/types";

//========================================================================================================================================================
//* endpoints for signUpApi
const endpoints = {
    baseUrl: 'https://inctagram-api.fly.dev/',
    registration: 'auth/registration',
    resendEmail: 'auth/confirmation-email-resending',
}
//========================================================================================================================================================


export const signUpApi = createApi({
    reducerPath: 'signUpApi',
    baseQuery: fetchBaseQuery({ baseUrl: endpoints.baseUrl }),
    endpoints: (build) => {
        return {
            signUp: build.mutation<RegisterResponseType, RegisterParamsType>({
                query: (data) => ({
                    method: 'POST',
                    url: endpoints.registration,
                    body: data,
                }),
            }),
            //========================================================================================================================================================
            //* request for ResendLink component
            emailResending: build.mutation({
                query: (body: { email: string }) => ({
                    url: endpoints.resendEmail,
                    method: 'POST',
                    body
                })
            }),
            //========================================================================================================================================================
        };
    },
});

export const {
    useSignUpMutation,
    useEmailResendingMutation
} = signUpApi
