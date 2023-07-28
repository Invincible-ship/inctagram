import {$api} from "@/shared/api/api"
import {StateSchema, ThunkExtraArg} from "./StateSchema"
import {rtkApi} from "@/shared/api/rtkApi"
import {configureStore} from "@reduxjs/toolkit"
import {signInReducer} from "@/features/auth/signIn/model/slice/signInSlice"

export function createReduxStore(
  initialState?: StateSchema
) {
  const rootReducer: {} = {
    // Ваши остальные редьюсеры
    [rtkApi.reducerPath]: rtkApi.reducer,
    signInReducer: signInReducer
  }

  const extraArg: ThunkExtraArg = {
    api: $api
  }

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: Boolean(process.env.IS_DEV),
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg
        }
      }).concat(rtkApi.middleware)
  })

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];