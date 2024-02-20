import { PostSortField } from '@/shared/const/postSortField'
import { SortOrder } from '@/shared/types/sort'
import { IUser } from '@/entities/User'

export type PostOwner = {
  firstName: string
  lastName: string
}

export type PostImage = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}

export type IPost = {
  id: number
  userName: string
  description: string
  location: string
  images: PostImage[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: PostOwner
}

export type AllPostsRequestParams = {
  idLastUploadedPost: number
  params: {
    limit?: number
    sort?: PostSortField
    order?: SortOrder
  }
}

export type UploadPostRequestParams = {
  description: string
  childrenMetadata: Array<{
    uploadId: string
  }>
}
