export { ProfileGeneralInfo } from './ui/ProfileGeneralInfo/ProfileGeneralInfo'
export { profileReducer, setProfileData, clearProfileData } from './model/slice/profileSlice'
export { getProfileData } from './model/selectors/getProfileData'
export {
  useGetProfileDataByIdQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  getProfileDataByIdQuery,
} from './api/profileApi'
export type { IAvatar, IProfile, IProfileSchema } from './model/types/types'
