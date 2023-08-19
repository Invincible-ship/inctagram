import { StateSchema } from '@/providers/StoreProvider'

export const emailSelector = (state: StateSchema) => state.user.authData?.email
