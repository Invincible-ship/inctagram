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

export interface GenericResponse {
  status: string
  message: string
}
