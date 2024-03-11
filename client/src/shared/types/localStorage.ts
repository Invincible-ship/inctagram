import { IPost } from '@/entities/Post'
import { ProfileSearchType } from '@/entities/Profile/model/types/types'

type UserSearch = {
  recent: ProfileSearchType[]
}

export type LocalStorageUser = {
  search?: UserSearch
  favorites?: IPost[]
}
