import {createSlice} from '@reduxjs/toolkit'
import {IUserSchema} from '@/entities/User/model/types/types'
import {signInThunk} from "@/features/auth/signIn/lib/signInThunk/signInThunk"

const initialState: IUserSchema = {
	_inited: false,
}

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action) => {
		},
		clearAuthData: state => {
			state.authData = undefined
		},
	},
	extraReducers: builder => {
		builder
			.addCase(signInThunk.fulfilled, (state: IUserSchema, action) => {
				state.authData = { isAuthorized: true, ...action.payload.user }
			})
	},
})

export const userReducer = slice.reducer
export const { setAuthData, clearAuthData } = slice.actions
