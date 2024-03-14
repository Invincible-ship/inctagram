import { StateSchema } from '@/app/providers/StoreProvider'

export const getAnimationDirection = (state: StateSchema) => state.createPost.animationDirection
