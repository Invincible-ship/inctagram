import { createSlice } from '@reduxjs/toolkit'
import { IUserSchema } from '../types/types'
import { signInThunk } from '@/features/auth/signIn/model/signInThunk'

const initialState: IUserSchema = {
  _inited: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action) => {},
    clearAuthData: state => {
      state.authData = undefined
    },
  },
  extraReducers: builder => {
    builder.addCase(signInThunk.fulfilled, (state: IUserSchema, action) => {
      state.authData = { isAuthorized: true, ...action.payload.user }
    })
  },
})

export const userReducer = userSlice.reducer
export const { setAuthData, clearAuthData } = userSlice.actions
