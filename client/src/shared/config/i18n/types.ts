export enum LanguageIds {
  RU = 'ru',
  EN = 'en',
}

export enum Namespaces {
  DEFAULT = 'translation',
  SIGNUP = 'signUp',
  SIGNOUT = 'signout',
  SIGNIN = 'signIn',
  RECOVERY = 'recovery',
  CONFIRMATION_EMAIL = 'confirmationEmail',
}

export type LanguageParams = { lng: LanguageIds }
