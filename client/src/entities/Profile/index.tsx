export { ProfileGeneralInfo } from './ui/ProfileGeneralInfo/ProfileGeneralInfo'
export {
  profileReducer,
  setProfileData,
  setProfileAvatars,
  clearProfileData,
} from './model/slice/profileSlice'
export { getProfileData } from './model/selectors/getProfileData'
export * as ProfileAvatars from './model/selectors/getProfileAvatars'
export {
  useGetProfileDataByIdQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileAvatarsMutation,
  useDeleteProfileAvatarsMutation,
  getProfileDataByIdQuery,
} from './api/profileApi'
export type { IAvatar, IProfile, IProfileSchema } from './model/types/types'
