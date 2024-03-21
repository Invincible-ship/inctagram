import { IPost } from '@/entities/Post'
import { PostSortField } from '@/shared/const/postSortField'
import { SortOrder } from '@/shared/types/sort'
import { EntityState } from '@reduxjs/toolkit'
import { PostListCardType } from '../consts/postListCardType'
import { PostListPage } from '../consts/postListPage'

export type PostListSchema = EntityState<IPost> & {
  postListId?: string

  isLoading?: boolean
  error?: string | string[]
  page: PostListPage | undefined

  type: PostListCardType | undefined

  // post filters
  sort: SortOrder
  sortBy: PostSortField

  // post pagination
  totalCount?: number
  lastPostId?: number
  limit: number
  hasMore: boolean
}

export type InitPostListPayload = {
  page: PostListPage
  type: PostListCardType
}
