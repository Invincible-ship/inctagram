import { StateSchema } from '@/providers/StoreProvider'

export const getUserId = (state: StateSchema) => state.user.authData?.userId
