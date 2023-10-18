import { ReactNode } from 'react'

export enum ProfileSettingValue {
  GENERAL_INFO = 'general-info',
  DEVICES = 'devices',
  ACCOUNT_MANAGMENT = 'account-managment',
  PAYMENTS = 'payments',
}

export type ProfileSettingsTab = {
  value: ProfileSettingValue
  content: ReactNode
}

export type IAvatar = {
  url: string
  width: number
  height: number
  fileSize: number
}

export type IProfile = {
  id: number
  userName: string
  firstName: string | null
  lastName: string | null
  city: string | null
  dateOfBirth: string | null
  aboutMe: string | null
  avatars: IAvatar[]
}

export type ProfileSchema = {
  profileData?: IProfile
  readonly: boolean
}
