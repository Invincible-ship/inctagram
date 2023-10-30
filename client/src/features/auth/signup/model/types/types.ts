import { FormSchemaType } from '../../lib/validationConstants/validationConstants'

export type RegisterParamsType = Omit<FormSchemaType, 'passwordConfirmation'>

export type ISignUpSchema = {
  isLoading: boolean
  isSignUpModalOpen: boolean
}
