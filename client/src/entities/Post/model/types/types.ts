import { SortOrder } from '@/shared/types/sort'
import { PostSortField } from '../consts/postConsts'

export type PostImage = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}

export type IPost = {
  id: number
  description: string
  location: string
  images: PostImage[]
  createdAt: string
  updatedAt: string
  ownerId: number
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
  childrenMetadata: {
    uploadId: string
  }
}
