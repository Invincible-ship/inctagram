import { StateSchema } from '@/app/providers/StoreProvider'

export const getErrorType = (state: StateSchema) => state.signIn.errorType
