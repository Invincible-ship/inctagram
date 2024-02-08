export type { PostImage, IPost, UploadPostRequestParams } from './model/types/types'
export {
  useCreatePostMutation,
  useDeletePostImageMutation,
  useDeletePostMutation,
  uploadPostImages,
  createPost,
  createdPostMatcher,
} from './api/postApi'
