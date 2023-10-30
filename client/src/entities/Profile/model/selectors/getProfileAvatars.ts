import { getProfileData } from './getProfileData'
import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const getAll = createDraftSafeSelector(getProfileData, profile => profile?.avatars)

export const getMedium = createDraftSafeSelector(getAll, avatars => {
  if (avatars) return avatars.find(avatar => avatar.width == 192)
})

export const getSmall = createDraftSafeSelector(getAll, avatars => {
  if (avatars) return avatars.find(avatar => avatar.width == 45)
})
