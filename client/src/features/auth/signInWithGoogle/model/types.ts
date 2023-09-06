import { IUser } from '@/entities/User'
import { LanguageIds } from '@/shared/config/i18n/types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export type TGoogleLoginResponse = {
  accessToken: string
  user: IUser
  isAuth: boolean
}

export type TGoogleLoginBody = {
  code: string
  lngId: LanguageIds
  router: AppRouterInstance
}
