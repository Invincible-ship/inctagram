import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsLoading = (state: StateSchema) => state.createPost.isLoading
