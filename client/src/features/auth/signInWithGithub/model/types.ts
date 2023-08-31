import { IUser } from '@/entities/User'
import { LanguageIds } from '@/shared/config/i18n/types'

export type TGithubLoginResponse = {
  accessToken: string
  user: IUser
  isAuth: boolean
}

export type TGithubLoginBody = {
  code: string
  lngId: LanguageIds
}
