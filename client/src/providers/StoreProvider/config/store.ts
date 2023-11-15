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
  }

  const extraArg: ThunkExtraArg = {
    api: $api,
  }

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: Boolean(process.env.IS_DEV),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
  })

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
