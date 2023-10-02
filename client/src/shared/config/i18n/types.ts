export enum LanguageIds {
  RU = 'ru',
  EN = 'en',
}

export enum Namespaces {
  DEFAULT = 'translation',
  SIGNUP = 'signUp',
  SIGNOUT = 'signout',
  SIGNIN = 'signIn',
  CONFIRMATION_EMAIL = 'confirmationEmail',
  PROFILE_SETTINGS = 'profile-settings',
  DATE_PICKER = 'date-picker',
}

export type LanguageParams = { lng: LanguageIds }
