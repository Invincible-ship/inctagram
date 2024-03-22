import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAvatar, IProfile, IProfileSchema } from '../types/types'
import {
  updateProfileAvatarsFulfilledMatcher,
  updateProfileFulfilledMatcher,
} from '../../api/profileApi'
import { TGeneralInfo } from '../types/generalInfoSchema'

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
    // edit profile form
    saveTempValues: (state, { payload }: PayloadAction<TGeneralInfo>) => {
      state.tempValues = payload
    },
    clearTempValues: state => {
      state.tempValues = undefined
    },
  },
  extraReducers: builder => {
    builder.addMatcher(updateProfileFulfilledMatcher, (state, { meta }) => {
      if (state.profileData) {
        state.profileData = { ...state.profileData, ...meta.arg.originalArgs }
      }
    })

    builder.addMatcher(updateProfileAvatarsFulfilledMatcher, (state, action) => {
      state.profileData!.avatars = action.payload.avatars
    })
  },
})

export const profileReducer = profileSlice.reducer
export const {
  setProfileData,
  setProfileAvatars,
  clearProfileData,
  saveTempValues,
  clearTempValues,
} = profileSlice.actions
