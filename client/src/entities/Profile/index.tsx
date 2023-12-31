export { ProfileGeneralInfo } from './ui/ProfileGeneralInfo/ProfileGeneralInfo'
export {
  profileReducer,
  setProfileData,
  setProfileAvatars,
  clearProfileData,
} from './model/slice/profileSlice'
export { getProfileData } from './model/selectors/getProfileData'
export * as ProfileAvatars from './model/selectors/getProfileAvatars'
export { initProfileDataThunk } from './model/services/initProfileDataThunk'
export {
  useGetProfileDataQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileAvatarsMutation,
  useDeleteProfileAvatarsMutation,
  getProfileDataQuery,
} from './api/profileApi'
export type { IAvatar, IProfile, IProfileSchema } from './model/types/types'
