import {ResetPasswordParamsType, ResetPasswordResponseType} from "@/features/auth/resetPassword/model/types/types";
import {rtkApi} from "@/shared/api/rtkApi";

export const reset_passwordApi = rtkApi.injectEndpoints({
    endpoints: (build) => {
        return {
            resetPassword: build.mutation<ResetPasswordResponseType, ResetPasswordParamsType>({
                query: (data) => ({
                    method: 'POST',
                    url: `auth/reset_password`,
                    body: data,
                }),
            }),
        }
    },
})

export const {useResetPasswordMutation} = reset_passwordApi
