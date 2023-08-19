export type IUser = {
  id: string
  userName: string
  email: string
  createdAt: string
  firstName?: string
  lastName?: string
  birthday?: string
  city?: string
  aboutMe?: string
  avatarLink?: string
}

export type IUserSchema = {
  authData?: IUser
  _inited: boolean
  isLoading: boolean
}
