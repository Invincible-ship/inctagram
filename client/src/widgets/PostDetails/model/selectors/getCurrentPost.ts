import { StateSchema } from '@/app/providers/StoreProvider'
import { IPost } from '@/entities/Post'
import { getPosts } from '@/widgets/PostList'

export const getCurrentPost = (postId: string) => (state: StateSchema) =>
  getPosts.selectById(state, postId) as IPost
