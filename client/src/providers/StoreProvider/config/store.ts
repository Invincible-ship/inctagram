import {Action, AnyAction, configureStore, ThunkAction, ThunkDispatch} from "@reduxjs/toolkit"
import {authReducer} from "@/features/auth/signup/model/slice/auth.slice"
import {appReducer} from "@/entities/Slices/app.slice"
import {signInApi} from "@/features/auth/signIn/api/signIn.api"
import {setupListeners} from "@reduxjs/toolkit/query"

export function makeStore() {
  return configureStore({
    reducer: {
      app: appReducer,
      auth: authReducer,
      [signInApi.reducerPath]: signInApi.reducer
    },
    middleware: (gDM) => gDM().concat(signInApi.middleware),
  })
}

const store = makeStore()

setupListeners(store.dispatch)

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, AppDispatch, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store
