export type LoginRequestType = {
  email: string
  password: string
}

export type LoginResponseType = {
  accessToken: string
}

export type ErrorType = 'internet'

export type ISignInSchema = {
  isErrorModalOpen: boolean
  isLoading: boolean
  error: boolean
  errorType: ErrorType | undefined
}
