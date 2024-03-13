import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsModalForward = (state: StateSchema) => state.createPost.isModalForward
