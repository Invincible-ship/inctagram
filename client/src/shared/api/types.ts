export type AuthRefreshResponse = {
  accessToken: string
}

export type ErrorResponse = {
  errors: FieldErrors
} 

type FieldErrors = {
  message: string
  field: string
}