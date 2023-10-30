import { IUser } from '@/entities/User'
import { LanguageIds } from '@/shared/config/i18n/types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

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
