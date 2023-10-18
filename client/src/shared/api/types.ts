export type AuthRefreshResponse = {
  accessToken: string
}

export type FieldError = {
  message: string
  field: string
}

export type ApiError = {
  statusCode: number
  messages: Array<FieldError> | string
  error: string
}
