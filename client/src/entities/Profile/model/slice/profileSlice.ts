import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProfile, IProfileSchema } from '../types/types'

const initialState: IProfileSchema = {
  readonly: true,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, { payload }: PayloadAction<IProfile>) => {
      state.profileData = payload
    },
    clearProfileData: state => {
      state.profileData = undefined
    },
  },
  extraReducers: builder => {},
})

export const profileReducer = profileSlice.reducer
export const { setProfileData, clearProfileData } = profileSlice.actions
