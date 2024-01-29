export enum LanguageIds {
  RU = 'ru',
  EN = 'en',
}

export enum Namespaces {
  DEFAULT = 'translation',
  // pages
  SIGNUP = 'signUp',
  SIGNOUT = 'signout',
  SIGNIN = 'signIn',
  FORGOTPASSWORD = 'forgot-password',
  CREATENEWPASSWORD = 'recovery-password',
  CONFIRMATION_EMAIL = 'confirmationEmail',
  PROFILE_SETTINGS = 'profile-settings',
  PROFILE_PAGE = 'profile-page',
  // widgets
  DATE_PICKER = 'date-picker',
  CITY_SELECT = 'city-select',
  SIDEBAR = 'sidebar',
  HEADER = 'header',
  CREATE_POST = 'create-post',
}

export type LanguageParams = { lng: LanguageIds }
