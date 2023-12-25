import { StateSchema } from '@/providers/StoreProvider'

export const getMaxStep = (state: StateSchema) => state.createPost.maxStep
