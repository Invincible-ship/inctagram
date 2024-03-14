import { StateSchema } from '@/app/providers/StoreProvider'

export const getPostData = (state: StateSchema) => state.createPost.postData
