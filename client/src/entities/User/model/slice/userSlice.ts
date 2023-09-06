import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser, IUserSchema } from '../types/types'
import { signInThunk } from '@/features/auth/signIn/model/signInThunk'
import { initAuthData } from '../../services/initAuthData'
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'
import { LoginResponseType } from '@/features/auth/signIn/model/types/types'

const initialState: IUserSchema = {
  _inited: false,
  isLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<LoginResponseType>) => {
      state.authData = payload.user
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, payload.accessToken)
      localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, payload.user.id)
    },
    clearAuthData: state => {
      state.authData = undefined
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
      localStorage.removeItem(LOCAL_STORAGE_USER_ID_KEY)
    },
  },
  extraReducers: builder => {
    builder.addCase(initAuthData.pending, state => {
      state.isLoading = true
    }),
      builder.addCase(
        initAuthData.fulfilled,
        (state, { payload }: PayloadAction<IUser | undefined>) => {
          state.isLoading = false
          state._inited = true
          state.authData = payload
        },
      ),
      builder.addCase(initAuthData.rejected, state => {
        state.isLoading = false
        state._inited = true
      })
  },
})

export const userReducer = userSlice.reducer
export const { clearAuthData, setAuthData } = userSlice.actions
