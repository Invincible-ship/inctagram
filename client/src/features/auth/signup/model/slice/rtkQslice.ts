import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const regisrationAPI = createApi({
    reducerPath: 'regisrationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram-api.fly.dev' }),
    endpoints: (builder) => ({
        userRegistration: builder.mutation({
            query: (body) => ({
                url: '/auth/registration',
                method: 'POST',
                body,
            }),
        })
    }),
})

export const {
    useUserRegistrationMutation,
} = regisrationAPI