export enum LanguageIds {
  RU = 'ru',
  EN = 'en',
}

export enum Locales {
  RU = 'ru-RU',
  EN = 'en-US',
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
  POST_DETAILS = 'post-details',
  // entities
  COMMENT_LIST = 'comment-list',
}

export type LanguageParams = { lng: LanguageIds }
