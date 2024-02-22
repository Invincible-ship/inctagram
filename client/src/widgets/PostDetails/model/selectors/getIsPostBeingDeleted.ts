import { StateSchema } from '@/providers/StoreProvider'

export const getIsPostBeingDeleted = (state: StateSchema) => state.postDetails.isPostBeingDeleted
