import {createSlice} from "@reduxjs/toolkit"
import {signInThunk} from "@/features/auth/signIn/model/signInThunk"
import { ISignInSchema } from "../types/types";

const initialState: ISignInSchema = {
	isLoading: false,
	error: false,
}

const slice = createSlice({
	name: 'signIn',
	initialState,
	reducers: {
		setDisableError(state) {
			state.error = false
		}
	},
	extraReducers: builder => {
		builder
			.addCase(signInThunk.fulfilled, (state) => {
				state.isLoading = false
			})
			.addCase(signInThunk.pending, (state) => {
				state.isLoading = true
			})
			.addCase(signInThunk.rejected, (state) => {
				state.isLoading = false
				state.error = true
			})
	},
})

export const signInReducer = slice.reducer
export const {setDisableError} = slice.actions
