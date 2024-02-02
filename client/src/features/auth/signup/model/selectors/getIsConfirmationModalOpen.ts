import { StateSchema } from '@/providers/StoreProvider'

export const getIsConfirmationModalOpen = (state: StateSchema) =>
  state.signup.isConfirmationModalOpen
