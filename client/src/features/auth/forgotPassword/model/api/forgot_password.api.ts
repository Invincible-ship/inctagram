import {ForgotParamsType, ForgotResponseType} from "@/features/auth/forgotPassword/model/types/types";
import {rtkApi} from "@/shared/api/rtkApi";


export const forgot_passwordApi = rtkApi.injectEndpoints({
    endpoints: (build) => {
        return {
            forgotPassword: build.mutation<ForgotResponseType, ForgotParamsType>({
                query: (data) => ({
                    method: 'POST',
                    url: `auth/forgot_password`,
                    body: data,
                }),
            }),
        }
    },
})

export const {useForgotPasswordMutation} = forgot_passwordApi
