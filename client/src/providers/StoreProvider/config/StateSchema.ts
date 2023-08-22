import { rtkApi } from '@/shared/api/rtkApi'
import { AxiosInstance } from 'axios'
import { ISignUpSchema } from '@/features/auth/signup'
import { IUserSchema } from '@/entities/User'
import { ISignInSchema } from '@/features/auth/signIn'
import { ForgotPasswordSchema } from '@/features/auth/forgotPassword'
import { ResetPasswordSchema } from '@/features/auth/resetPassword/model/types/types'

export type StateSchema = {
  // Остальные типы ваших редьюсеров
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  user: IUserSchema
  signIn: ISignInSchema
  signup: ISignUpSchema
  forgotPassword: ForgotPasswordSchema
  resetPassword: ResetPasswordSchema
}

export type ThunkExtraArg = {
  api: AxiosInstance
}

export type ThunkConfig<T> = {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
