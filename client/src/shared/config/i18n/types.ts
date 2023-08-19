export enum LanguageIds {
  RU = 'ru',
  EN = 'en',
}

export enum Namespaces {
  DEFAULT = 'translation',
  SIGNUP = 'signUp',
  SIGNOUT = 'signout',
  SIGNIN = 'signin',
  EMAIL_CONFIRMATION = 'emailConfiramtion',
}

export type LanguageParams = { lng: LanguageIds }
