'use server'

import { PostListResponse } from '../../types/types'
import { GET_POSTS_BY_PROFILE_ID } from '@/shared/const/apiEndpoints'
import { PostSortField } from '@/shared/const/postSortField'
import { SortOrder } from '@/shared/types/sort'

const API = process.env.API

type SearchParams = {
  sort?: PostSortField
  limit?: string
  order?: SortOrder
}

export const fetchProfilePosts = async (profileId: string, sp?: SearchParams) => {
  const { limit, sort, order } = sp || {}
  const qp = new URLSearchParams({
    pageSize: limit || '8',
    sortBy: sort || PostSortField.CREATED,
    sortDirection: order || 'desc',
  })

  const response = await fetch(`${API}${GET_POSTS_BY_PROFILE_ID}/${profileId}?${qp.toString()}`, {
    next: {
      revalidate: 60,
    },
  })

  if (!response.ok) return undefined

  return response.json() as Promise<PostListResponse>
}
