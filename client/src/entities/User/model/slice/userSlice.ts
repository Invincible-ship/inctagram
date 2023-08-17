import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser, IUserSchema } from '../types/types'
import { signInThunk } from '@/features/auth/signIn/model/signInThunk'
import { initAuthData } from '../../services/initAuthData'
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'

const initialState: IUserSchema = {
  _inited: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAuthData: state => {
      state.authData = undefined
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
      localStorage.removeItem(LOCAL_STORAGE_USER_ID_KEY)
    },
  },
  extraReducers: builder => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.authData = action.payload.user
    }),
      builder.addCase(
        initAuthData.fulfilled,
        (state, { payload }: PayloadAction<IUser | undefined>) => {
          state._inited = true
          state.authData = payload
        },
      ),
      builder.addCase(initAuthData.rejected, state => {
        state._inited = true
      })
  },
})

export const userReducer = userSlice.reducer
export const { clearAuthData } = userSlice.actions
