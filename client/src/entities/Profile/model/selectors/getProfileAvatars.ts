import { AvatarSize } from '@/shared/ui/Avatar/Avatar'
import { getProfileData } from './getProfileData'
import { createSelector } from '@reduxjs/toolkit'

export const getAll = createSelector(getProfileData, profile => profile?.avatars)

export const getLarge = createSelector(getAll, avatars => {
  if (avatars) return avatars.find(avatar => avatar.width == AvatarSize.LARGE)
})

export const getSmall = createSelector(getAll, avatars => {
  if (avatars) return avatars.find(avatar => avatar.width == AvatarSize.SMALL)
})
