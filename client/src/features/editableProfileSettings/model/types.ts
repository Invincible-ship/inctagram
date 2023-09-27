export enum ProfileSettingValue {
  GENERAL_INFO = 'general-info',
  DEVICES = 'devices',
  ACCOUNT_MANAGMENT = 'account-managment',
  PAYMENTS = 'payments',
}

export type ProfileSettingTab = {
  value: ProfileSettingValue
  content: string
}
