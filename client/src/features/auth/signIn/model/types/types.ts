export type LoginRequestType = {
  email: string
  password: string
}

export type LoginResponseType = {
  accessToken: string
  user: {
    id: string
    userName: string
    email: string
    createdAt: string
  }
}

export type ISignInSchema = {
  isLoading: boolean
  error: boolean
}
