import {configureStore, ThunkAction, Action, ThunkDispatch, AnyAction} from "@reduxjs/toolkit";
import {authActions, authReducer} from "@/features/auth/signup/model/slice/auth.slice";
import {appReducer} from "@/entities/Slices/app.slice";

export function makeStore() {
    return configureStore({
        reducer: {
            app: appReducer,
            auth: authReducer
        },
        middleware: (gDM) => gDM().concat(),
    });
}

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, AppDispatch, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;