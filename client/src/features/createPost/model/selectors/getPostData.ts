import { StateSchema } from '@/providers/StoreProvider'

export const getPostData = (state: StateSchema) => state.createPost.postData
