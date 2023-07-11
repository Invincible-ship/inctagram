import { configureStore, ThunkAction, Action, ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import { authActions, authReducer } from "@/features/auth/signup/model/slice/auth.slice";
import { regisrationAPI } from '@/features/auth/signup/model/slice/rtkQslice'


export function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            [regisrationAPI.reducerPath]: regisrationAPI.reducer

        },
        middleware: gDM => gDM().concat(regisrationAPI.middleware)
    })
}

const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, AppDispatch, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export default store

