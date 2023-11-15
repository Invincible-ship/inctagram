export { fetchPostById } from './api/postApi'
export type { PostImage, IPost } from './model/types/types'
export {
  useFetchPostByIdQuery,
  useFetchAllPostsQuery,
  useFetchPostsByUserIdQuery,
  useUploadPostImageMutation,
  useCreatePostMutation,
  useDeletePostImageMutation,
  useDeletePostMutation,
} from './api/postApi'
