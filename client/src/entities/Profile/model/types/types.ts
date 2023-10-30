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

export type IProfileSchema = {
  profileData?: IProfile
  readonly: boolean
}
