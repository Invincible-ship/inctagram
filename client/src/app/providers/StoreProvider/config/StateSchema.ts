import { rtkApi } from '@/shared/api/rtkApi'
import { AxiosInstance } from 'axios'
import { ISignUpSchema } from '@/features/auth/signup'
import { IUserSchema } from '@/entities/User'
import { ISignInSchema } from '@/features/auth/signIn'
import { IProfileSchema } from '@/entities/Profile'
import { ISignInWithGoogleSchema } from '@/features/auth/signInWithThirdPartyServices'
import { ICreatePostSchema } from '@/features/post/createPost'
import { PostListSchema } from '@/widgets/PostList'
import { UISchema } from '@/features/UI'
import { PostDetailsSchema } from '@/widgets/PostDetails'
import { IPostSchema } from '@/entities/Post/model/types/types'

export type StateSchema = {
  // Остальные типы ваших редьюсеров
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  user: IUserSchema
  post: IPostSchema
  profile: IProfileSchema
  signIn: ISignInSchema
  signup: ISignUpSchema
  signInWithGoogle: ISignInWithGoogleSchema
  createPost: ICreatePostSchema
  postList: PostListSchema
  postDetails: PostDetailsSchema
  ui: UISchema
}

export type ThunkExtraArg = {
  api: AxiosInstance
}

export type ThunkConfig<T = any> = {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
