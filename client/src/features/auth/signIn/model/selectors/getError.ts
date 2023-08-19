import { StateSchema } from '@/providers/StoreProvider'

export const getError = (state: StateSchema) => state.signIn.error
