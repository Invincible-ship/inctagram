import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAvatar, IProfile, IProfileSchema } from '../types/types'

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
    setProfileAvatars: (state, { payload }: PayloadAction<IAvatar[]>) => {
      if (state.profileData) state.profileData.avatars = payload
    },
    clearProfileData: state => {
      state.profileData = undefined
    },
  },
  extraReducers: builder => {},
})

export const profileReducer = profileSlice.reducer
export const { setProfileData, setProfileAvatars, clearProfileData } = profileSlice.actions
