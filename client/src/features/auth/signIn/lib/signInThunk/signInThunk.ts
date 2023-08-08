import {createAsyncThunk} from "@reduxjs/toolkit"
import {userApi} from "@/entities/User"
import {isFetchBaseQueryError} from "@/shared/api/isFetchBaseQueryError"
import {LoginRequestType, LoginResponseType} from "@/features/auth/signIn/model/types/types"

export const signInThunk = createAsyncThunk<LoginResponseType, LoginRequestType>(
	'auth/login',
	async (body: LoginRequestType, {dispatch}) => {
		try {
			const response = await dispatch(userApi.endpoints.signIn.initiate(body)).unwrap()
			if (response.accessToken) {
				localStorage.setItem('accessToken', response.accessToken)
				return response.data
			}
		} catch (error) {
			if (isFetchBaseQueryError(error)) {
				if (typeof error.data === 'string') {
					throw new Error(error.data)
				}
			}
			return new Error('Unknown error')
		}
	}
)