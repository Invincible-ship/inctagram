import { rtkApi } from '@/shared/api/rtkApi'
import {
  AllPostsRequestParams,
  IPost,
  PostImage,
  UploadPostRequestParams,
} from '../model/types/types'
import {
  ALL_POSTS_ENDPOINT,
  POST_BY_ID_ENDPOINT,
  POST_BY_USER_ID_ENDPOINT,
  UPLOAD_POST_IMAGE_ENDPOINT,
  CREATE_POST_ENDPOINT,
  DELETE_POST_IMAGE_ENDPOINT,
} from '@/shared/const/apiEndpoints'
import { POST_TAG } from '@/shared/const/rtk'

export const postApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    // fetchings posts
    fetchPostById: build.query<IPost, number>({
      query: id => `${POST_BY_ID_ENDPOINT}/{${id}}`,
      providesTags: (result, error, id) => [{ type: POST_TAG, id }],
    }),
    fetchAllPosts: build.query<IPost[], AllPostsRequestParams>({
      query: ({ idLastUploadedPost, params: { limit, sort, order } }) => ({
        url: `${ALL_POSTS_ENDPOINT}/${idLastUploadedPost}`,
        params: {
          pageSize: limit,
          sortBy: sort,
          sortDirection: order,
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(post => ({ type: POST_TAG, id: post.id }) as const),
              { type: POST_TAG, id: 'LIST' },
            ]
          : [{ type: POST_TAG, id: 'LIST' }],
    }),
    fetchPostsByUserId: build.query<IPost[], AllPostsRequestParams>({
      query: ({ idLastUploadedPost, params: { limit, sort, order } }) => ({
        url: `${POST_BY_USER_ID_ENDPOINT}/${idLastUploadedPost}`,
        params: {
          pageSize: limit,
          sortBy: sort,
          sortDirection: order,
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(post => ({ type: POST_TAG, id: post.id }) as const),
              { type: POST_TAG, id: 'LIST' },
            ]
          : [{ type: POST_TAG, id: 'LIST' }],
    }),
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

export const fetchPostById = postApi.endpoints.fetchPostById.initiate
export const uploadPostImages = postApi.endpoints.uploadPostImages.initiate
export const createPost = postApi.endpoints.createPost.initiate
export const createdPostMatcher = postApi.endpoints.createPost.matchFulfilled
export const {
  useFetchPostByIdQuery,
  useFetchAllPostsQuery,
  useFetchPostsByUserIdQuery,
  useUploadPostImagesMutation,
  useCreatePostMutation,
  useDeletePostImageMutation,
  useDeletePostMutation,
} = postApi
