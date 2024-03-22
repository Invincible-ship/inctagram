import { TGeneralInfo } from './generalInfoSchema'

export type IAvatar = {
  url: string
  width: number
  height: number
  fileSize: number
}

export type IProfile = {
  id: number
  userName: string
  firstName: string | null
  lastName: string | null
  city: string | null
  dateOfBirth: Date | null
  aboutMe: string | null
  avatars: IAvatar[]
}

export type ExtendedProfile = IProfile & {
  isFollowing: boolean
  isFollowedBy: boolean
  followingCount: number
  followersCount: number
  publicationsCount: number
}

export type AllProfilesRequestParams = {
  search?: string
  pageSize?: number
  pageNumber?: number
  cursor?: number
}

export type ProfileSearchType = Omit<IProfile, 'city' | 'dateOfBirth' | 'aboutMe'> & {
  createdAt: string
}

export type AllProfilesResponse = {
  totalCount: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  nextCursor: number | null
  items: ProfileSearchType[]
}

export type IProfileSchema = {
  tempValues?: TGeneralInfo
  profileData?: IProfile
  readonly: boolean
}
