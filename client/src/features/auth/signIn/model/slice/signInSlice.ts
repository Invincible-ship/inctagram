import {createSlice} from "@reduxjs/toolkit"
import {signInThunk} from "@/features/auth/signIn/lib/signInThunk/signInThunk"

type initialStateType = {
	isLoading: boolean;
	error: boolean;
}

const initialState: initialStateType = {
	isLoading: false,
	error: false,
}

const slice = createSlice<initialStateType>({
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
