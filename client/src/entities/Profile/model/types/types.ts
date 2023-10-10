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
