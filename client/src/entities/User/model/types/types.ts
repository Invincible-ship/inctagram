export type IUser = {
  userId: number
  userName: string
  email: string
}

export type IUserSchema = {
  authData?: IUser
  _inited: boolean
  isLoading: boolean
}
