import { StateSchema } from '@/app/providers/StoreProvider'

export const getMaxStep = (state: StateSchema) => state.createPost.maxStep
