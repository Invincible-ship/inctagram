import { $api } from '@/shared/api/api'
import { StateSchema, ThunkExtraArg } from './StateSchema'
import { rtkApi } from '@/shared/api/rtkApi'
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { userReducer } from '@/entities/User'
import { signInReducer } from '@/features/auth/signIn'
import { signupReducer } from '@/features/auth/signup'
import { profileReducer } from '@/entities/Profile'
import { signInWithGoogleReducer } from '@/features/auth/signInWithThirdPartyServices'
import { createPostReducer } from '@/features/createPost'
import { postListReducer } from '@/widgets/PostList'
import { UIReducer } from '@/features/UI'
import { postDetailsReducer } from '@/widgets/PostDetails/model/slice/postDetailsSlice'

export function createReduxStore(initialState?: StateSchema) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    // Ваши остальные редьюсеры
    [rtkApi.reducerPath]: rtkApi.reducer,
    user: userReducer,
    profile: profileReducer,
    signIn: signInReducer,
    signup: signupReducer,
    signInWithGoogle: signInWithGoogleReducer,
    createPost: createPostReducer,
    postList: postListReducer,
    postDetails: postDetailsReducer,
    ui: UIReducer,
  }

  const extraArg: ThunkExtraArg = {
    api: $api,
  }

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: __IS_DEV__,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
        serializableCheck: {
          ignoredPaths: [
            'profile.profileData.dateOfBirth',
            'createPost.postData.images',
            'payload.file',
          ],
          ignoredActions: ['createPost', 'createPost/addPostImage'],
        },
      }).concat(rtkApi.middleware),
  })

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
