import { StateSchema } from '@/providers/StoreProvider'

export const isLoadingSelector = (state: StateSchema) => state.signIn.isLoading
export const errorSelector = (state: StateSchema) => state.signIn.error
