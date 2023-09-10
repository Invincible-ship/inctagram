import { IUser } from '@/entities/User'

export type LoginRequestType = {
  email: string
  password: string
}

export type LoginResponseType = {
  accessToken: string
  user: IUser
}

export type ISignInSchema = {
  isLoading: boolean
  error: boolean
}
