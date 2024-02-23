import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsErrorModalOpen = (state: StateSchema) => state.signup.isErrorModalOpen
