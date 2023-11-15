import { rtkApi } from '@/shared/api/rtkApi'
import { AxiosInstance } from 'axios'
import { ISignUpSchema } from '@/features/auth/signup'
import { IUserSchema } from '@/entities/User'
import { ISignInSchema } from '@/features/auth/signIn'
import { IProfileSchema } from '@/entities/Profile'
import { ISignInWithGoogleSchema } from '@/features/auth/signInWithThirdPartyServices'
import { ICreatePostSchema } from '@/features/createPost'

export type StateSchema = {
  // Остальные типы ваших редьюсеров
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  user: IUserSchema
  profile: IProfileSchema
  signIn: ISignInSchema
  signup: ISignUpSchema
  signInWithGoogle: ISignInWithGoogleSchema
  createPost: ICreatePostSchema
}

export type ThunkExtraArg = {
  api: AxiosInstance
}

export type ThunkConfig<T> = {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
