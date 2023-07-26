import {LoginRequestType, LoginResponseType} from "@/features/auth/signIn/model/types/types"
import {rtkApi} from "@/shared/api/rtkApi"


export const signInApi = rtkApi.injectEndpoints({
	endpoints: (build) => {
		return {
			signIn: build.mutation<LoginResponseType, LoginRequestType>({
					query: (data) => {
						return {
							method: 'POST',
							url: '/auth/login',
							body: data
						}
					}
				}
			)
		}
	}
})

export const {useSignInMutation} = signInApi