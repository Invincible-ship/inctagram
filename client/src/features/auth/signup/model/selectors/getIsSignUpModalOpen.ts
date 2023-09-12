import { StateSchema } from '@/providers/StoreProvider'

export const getIsSignUpModalOpen = (state: StateSchema) => state.signup.isSignUpModalOpen
