import { StateSchema } from '@/providers/StoreProvider'

export const isLoadingSelector = (state: StateSchema) => state.signup.isLoading
