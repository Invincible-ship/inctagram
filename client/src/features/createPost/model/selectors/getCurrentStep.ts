import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentStep = (state: StateSchema) => state.createPost.currentStep
