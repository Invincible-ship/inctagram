import { StateSchema } from '@/app/providers/StoreProvider'

export const getUpdatedPostList = (state: StateSchema) => state.postDetails.updatedPostList
