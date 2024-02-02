import { StateSchema } from '@/providers/StoreProvider'

export const getErrorType = (state: StateSchema) => state.signup.errorType
