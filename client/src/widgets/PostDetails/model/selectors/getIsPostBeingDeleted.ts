import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsPostBeingDeleted = (state: StateSchema) => state.postDetails.isPostBeingDeleted
