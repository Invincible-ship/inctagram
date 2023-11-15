import { StateSchema } from '@/providers/StoreProvider'

export const getPostImages = (state: StateSchema) => state.createPost.postData.images
