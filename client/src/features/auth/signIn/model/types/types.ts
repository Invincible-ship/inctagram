export type LoginRequestType = {
  email: string
  password: string
}

export type LoginResponseType = {
  accessToken: string
}

export type ISignInSchema = {
  isLoading: boolean
  error: boolean
}
