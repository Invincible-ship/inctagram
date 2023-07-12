import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FormSchemaType } from '../../ui/signup'

const endpoints = {
    baseUrl: 'https://inctagram-api.fly.dev',
    registration: '/auth/registration',
    confirmation: '/auth/registration-confirmation',
    resendEmail: '/auth/confirmation-email-resending'
}


export const regisrationAPI = createApi({
    reducerPath: 'regisrationApi',
    baseQuery: fetchBaseQuery({ baseUrl: endpoints.baseUrl }),
    endpoints: (builder) => ({
        userRegistration: builder.mutation({
            query: (body: FormSchemaType) => ({
                url: endpoints.registration,
                method: 'POST',
                body,
            })
        }),
        registrationConfirmation: builder.mutation({
            query: (code: string) => ({
                url: `${endpoints.confirmation}?${code}`,
                method: 'POST'
            })
        }),
        emailResending: builder.mutation({
            query: (body: { email: string }) => ({
                url: endpoints.resendEmail,
                method: 'POST',
                body
            })
        })
    })
})

export const {
    useUserRegistrationMutation,
    useRegistrationConfirmationMutation,
    useEmailResendingMutation
} = regisrationAPI


//registrationСonfirm: builder.mutation<void | ServerErrorResponse, string>
//registration-confirmation?confirmationCode=1689167348610