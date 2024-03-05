import { AllPostsRequestParams, PublicPostsByIdRequestParams } from '@/entities/Viewer/types/types'
import { GET_POSTS_BY_PROFILE_ID, GET_ALL_POSTS } from '@/shared/const/apiEndpoints'

export const getPostRequestQuery = (
  config: PublicPostsByIdRequestParams | AllPostsRequestParams,
) => {
  const { lastPostId, order, sort, limit } = config

  const lastPostIdURL = lastPostId ? `/${lastPostId}` : ''
  // @ts-ignore
  const url = config?.profileId
    ? // @ts-ignore
      `${GET_POSTS_BY_PROFILE_ID}/${config.profileId}${lastPostIdURL}`
    : `${GET_ALL_POSTS}${lastPostIdURL}`

  const params = {
    pageSize: limit,
    sortBy: sort,
    sortDirection: order,
  }

  return {
    url,
    params,
  }
}
