export { fetchPostById } from './api/postApi'
export type { PostImage, IPost, UploadPostRequestParams } from './model/types/types'
export {
  useFetchPostByIdQuery,
  useFetchAllPostsQuery,
  useFetchPostsByUserIdQuery,
  useCreatePostMutation,
  useDeletePostImageMutation,
  useDeletePostMutation,
  uploadPostImages,
  createPost,
  createdPostMatcher,
  deletePostMatcher,
} from './api/postApi'
