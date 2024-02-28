import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsErrorModalOpen = (state: StateSchema) => state.signIn.isErrorModalOpen
