import { FormSchemaType } from '../../lib/validationConstants/validationConstants'

export type RegisterParamsType = Omit<FormSchemaType, 'passwordConfirmation'>

export type ErrorType = 'internet' | 'existedEmail' | 'existedUsername'

export type ISignUpSchema = {
  defaultValues?: FormSchemaType
  isLoading: boolean
  isConfirmationModalOpen: boolean
  isErrorModalOpen: boolean
  errorType: ErrorType | undefined
}
