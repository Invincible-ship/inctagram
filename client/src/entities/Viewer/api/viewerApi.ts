import { IViewer, AllPostsRequestParams, PublicPostsByIdRequestParams } from '../types/types'
import { rtkApi } from '@/shared/api/rtkApi'
import {
  GET_ALL_POSTS,
  GET_POSTS_BY_PROFILE_ID,
  GET_PUBLIC_USER_PROFILE,
} from '@/shared/const/apiEndpoints'
import { PostListResponse } from '../types/types'
import { POST_TAG } from '@/shared/const/rtk'

export const viewerApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    // public users
    getPublicUserProfile: build.query<IViewer, string>({
      query: profileId => `${GET_PUBLIC_USER_PROFILE}/${profileId}`,
      providesTags: (result, error, id) => [{ type: POST_TAG, id }],
    }),
    getPostsByProfileId: build.query<PostListResponse, PublicPostsByIdRequestParams>({
      query: config => {
        const { profileId, lastPostId, order, sort, limit } = config

        const lastPostIdURL = lastPostId ? `/${lastPostId}` : ''
        const url = `${GET_POSTS_BY_PROFILE_ID}/${profileId}${lastPostIdURL}`

        const params = {
          pageSize: limit,
          sortBy: sort,
          sortDirection: order,
        }

        return {
          url,
          params,
        }
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.items.map(post => ({ type: POST_TAG, id: post.id }) as const),
              { type: POST_TAG, id: 'LIST' },
            ]
          : [{ type: POST_TAG, id: 'LIST' }],
    }),
    getAllPosts: build.query<PostListResponse, AllPostsRequestParams>({
      query: config => {
        const { lastPostId, order, sort, limit } = config

        const lastPostIdURL = lastPostId ? `/${lastPostId}` : ''
        const url = `${GET_ALL_POSTS}${lastPostIdURL}`

        const params = {
          pageSize: limit,
          sortBy: sort,
          sortDirection: order,
        }

        return {
          url,
          params,
        }
      },
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
