import { IUser } from '@/entities/User'
import { LanguageIds } from '@/shared/config/i18n/types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export type TGithubLoginResponse = {
  accessToken: string
  user: IUser
  isAuth: boolean
}

export type TGithubLoginBody = {
  code: string
  lngId: LanguageIds
  router: AppRouterInstance
}
