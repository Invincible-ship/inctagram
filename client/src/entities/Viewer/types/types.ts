import { IPost } from '@/entities/Post'
import { IAvatar } from '@/entities/Profile'
import { PostSortField } from '@/shared/const/postSortField'
import { SortOrder } from '@/shared/types/sort'

export type IViewer = {
  id: number
  userName: string
  aboutMe: string
  avatars: IAvatar[]
}

export type GetPostsByProfileIdRequestParams = {
  profileId: string
  lastPostId?: number
  order: SortOrder
  sort: PostSortField
  limit: number
}

export type PostListResponse = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: IPost[]
}
