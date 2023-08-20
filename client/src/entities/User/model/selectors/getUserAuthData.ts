import { StateSchema } from '@/providers/StoreProvider'

export const getUserAuthData = (state: StateSchema) => state.user?.authData
