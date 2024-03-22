export type { PostImage, IPost, UploadPostRequestParams } from './model/types/types'
export {
  useCreatePostMutation,
  useDeletePostImageMutation,
  useDeletePostMutation,
  uploadPostImages,
  createPost,
  deletePostMutation,
  createdPostMatcher,
  deletePostMatcher,
  updatePostByIdMatcher,
} from './api/postApi'
export { setCurrentPost, resetCurrentPost } from './model/slice/postSlice'
export { postReducer } from './model/slice/postSlice'
export { getCurrentPost } from './model/selectors/getCurrentPost'
export { PostInfoBlock } from './ui/PostInfoBlock/PostInfoBlock'
export { PostDetailsConfirmationModal } from './ui/PostDetailsConfirmationModal/PostDetailsConfirmationModal'
export { PostCardExtended, PostCardExtendedSkeleton } from './ui/PostCardExtended/PostCardExtended'
export { PostCardImage } from './ui/PostCardImage/PostCardImage'
