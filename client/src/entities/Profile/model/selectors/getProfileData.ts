import { StateSchema } from '@/providers/StoreProvider'

export const getProfileData = (state: StateSchema) => state.profile.profileData
