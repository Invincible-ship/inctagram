import { StateSchema } from '@/providers/StoreProvider'

export const getCurrentStep = (state: StateSchema) => state.createPost.currentStep
