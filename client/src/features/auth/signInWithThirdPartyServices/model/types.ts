import { IUser } from '@/entities/User'

export type TOAuthLoginResponse = {
  accessToken: string
  user: IUser
  isAuth: boolean
}
