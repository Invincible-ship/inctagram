import { IViewer, AllPostsRequestParams, PublicPostsByIdRequestParams } from '../model/types/types'
import { rtkApi } from '@/shared/api/rtkApi'
import {
  GET_ALL_POSTS,
  GET_POSTS_BY_PROFILE_ID,
  GET_PUBLIC_USER_PROFILE,
} from '@/shared/const/apiEndpoints'
import { PostListResponse } from '../model/types/types'
import { POST_TAG } from '@/shared/const/rtk'
import { getPostRequestQuery } from '@/entities/Viewer/model/utils/getPostRequestQuery'

export const viewerApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    // public users
    getPublicUserProfile: build.query<IViewer, string>({
      query: profileId => `${GET_PUBLIC_USER_PROFILE}/${profileId}`,
      providesTags: (result, error, id) => [{ type: POST_TAG, id }],
    }),
    getPostsByProfileId: build.query<PostListResponse, PublicPostsByIdRequestParams>({
      query: config => getPostRequestQuery(config),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.items.map(post => ({ type: POST_TAG, id: post.id }) as const),
              { type: POST_TAG, id: 'LIST' },
            ]
          : [{ type: POST_TAG, id: 'LIST' }],
    }),
    getAllPosts: build.query<PostListResponse, AllPostsRequestParams>({
      query: config => getPostRequestQuery(config),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.items.map(post => ({ type: POST_TAG, id: post.id }) as const),
              { type: POST_TAG, id: 'LIST' },
            ]
          : [{ type: POST_TAG, id: 'LIST' }],
    }),
  }),
})

export const getPublicUserProfile = viewerApi.endpoints.getPublicUserProfile.initiate
export const getPostsByProfileId = viewerApi.endpoints.getPostsByProfileId.initiate
export const getAllPosts = viewerApi.endpoints.getAllPosts.initiate
export const getAllPostsMatcher = viewerApi.endpoints.getAllPosts.matchFulfilled

export const { useGetPublicUserProfileQuery } = viewerApi
