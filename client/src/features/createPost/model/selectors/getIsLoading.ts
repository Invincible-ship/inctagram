import { StateSchema } from '@/providers/StoreProvider'

export const getIsLoading = (state: StateSchema) => state.createPost.isLoading
