export enum LanguageIds {
  RU = 'ru',
  EN = 'en',
}

export enum Namespaces {
  DEFAULT = 'translation',
  SIGNUP = 'signUp',
  SIGNOUT = 'signout',
  SIGNIN = 'signIn',
  REQOVERY = 'reqovery',
  CONFIRMATION_EMAIL = 'confirmationEmail',
}

export type LanguageParams = { lng: LanguageIds }
