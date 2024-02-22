import { IAvatar } from '@/entities/Profile'

export type CommentUser = {
  id: number
  username: string
  avatars: IAvatar[]
}

export type IComment = {
  id: number
  postId: number
  from: CommentUser
  content: string
  createdAt: string
}
