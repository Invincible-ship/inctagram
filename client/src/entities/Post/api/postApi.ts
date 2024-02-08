import { rtkApi } from '@/shared/api/rtkApi'
import {
  AllPostsRequestParams,
  IPost,
  PostImage,
  UploadPostRequestParams,
} from '../model/types/types'
import {
  UPLOAD_POST_IMAGE_ENDPOINT,
  CREATE_POST_ENDPOINT,
  DELETE_POST_IMAGE_ENDPOINT,
} from '@/shared/const/apiEndpoints'
import { POST_TAG } from '@/shared/const/rtk'

export const postApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    // uploading post's images and creating posts
    uploadPostImages: build.mutation<{ images: PostImage[] }, FormData>({
      query: formData => ({
        method: 'POST',
        url: UPLOAD_POST_IMAGE_ENDPOINT,
        body: formData,
      }),
    }),
    createPost: build.mutation<IPost, UploadPostRequestParams>({
      query: body => ({
        contentType: 'application/json',
        method: 'POST',
        url: CREATE_POST_ENDPOINT,
        body,
      }),
      invalidatesTags: () => [{ type: POST_TAG, id: 'LIST' }],
    }),
    // updating posts
    updatePostById: build.mutation<void, number>({
      query: id => ({
        method: 'PUT',
        url: `${CREATE_POST_ENDPOINT}/${id}`,
      }),
      invalidatesTags: (result, error, id) => [{ type: POST_TAG, id }],
    }),
    // deleting post's images and posts
    deletePostImage: build.mutation<void, string>({
      query: id => ({
        method: 'DELETE',
        url: `${DELETE_POST_IMAGE_ENDPOINT}/${id}`,
      }),
    }),
    deletePost: build.mutation<void, number>({
      query: id => ({
        method: 'DELETE',
        url: `${DELETE_POST_IMAGE_ENDPOINT}/${id}`,
      }),
      invalidatesTags: (result, error, id) => [{ type: POST_TAG, id }],
    }),
  }),
})

export const uploadPostImages = postApi.endpoints.uploadPostImages.initiate
export const createPost = postApi.endpoints.createPost.initiate
export const createdPostMatcher = postApi.endpoints.createPost.matchFulfilled
export const {
  useUploadPostImagesMutation,
  useCreatePostMutation,
  useDeletePostImageMutation,
  useDeletePostMutation,
} = postApi
