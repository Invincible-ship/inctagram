import { StateSchema } from '@/providers/StoreProvider'

export const getNewDescription = (state: StateSchema) => state.postDetails.textValue
