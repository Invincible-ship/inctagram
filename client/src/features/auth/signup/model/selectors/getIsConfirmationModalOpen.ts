import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsConfirmationModalOpen = (state: StateSchema) =>
  state.signup.isConfirmationModalOpen
