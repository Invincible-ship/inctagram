import { GetPostsByProfileIdRequestParams, IViewer } from '../types/types'
import { rtkApi } from '@/shared/api/rtkApi'
import { GET_POSTS_BY_PROFILE_ID, GET_PUBLIC_USER_PROFILE } from '@/shared/const/apiEndpoints'
import { PostListResponse } from '../types/types'
import { POST_TAG } from '@/shared/const/rtk'

export const viewerApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    // public users
    getPublicUserProfile: build.query<IViewer, string>({
      query: profileId => `${GET_PUBLIC_USER_PROFILE}/${profileId}`,
    }),
    getPostsByProfileId: build.query<PostListResponse, GetPostsByProfileIdRequestParams>({
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
      providesTags: [{ type: POST_TAG, id: 'LIST' }],
    }),
  }),
})

export const getPublicUserProfile = viewerApi.endpoints.getPublicUserProfile.initiate
export const getPostsByProfileId = viewerApi.endpoints.getPostsByProfileId.initiate

export const { useGetPublicUserProfileQuery } = viewerApi
