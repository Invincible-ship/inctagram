export type ResetPasswordParamsType = {
  password: string
  passwordConfirmation: string
}
export type ResetPasswordResponseType = {
  id: string
  createdAt: string
}
export type ResetPasswordSchema = {
  isLoading: boolean
}
