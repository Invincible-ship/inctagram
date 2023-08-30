import { IUser } from '@/entities/User'
import { LanguageIds } from '@/shared/config/i18n/types'

export type TGoogleLoginResponse = {
  accessToken: string
  user: IUser
}

export type TGoogleLoginBody = {
  code: string
  lngId: LanguageIds
}
