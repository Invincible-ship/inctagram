import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser, IUserSchema } from '../types/types'
import { initAuthData } from '../../services/initAuthData'
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'

const initialState: IUserSchema = {
  _inited: false,
  isLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<IUser>) => {
      state.authData = payload
      localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, JSON.stringify(payload.userId))
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
        state.authData = undefined
        state.isLoading = false
        state._inited = true
      })
  },
})

export const userReducer = userSlice.reducer
export const { clearAuthData, setAuthData } = userSlice.actions
