import {configureStore, ThunkAction, Action, ThunkDispatch, AnyAction} from "@reduxjs/toolkit";
import {authReducer} from "@/features/auth/auth.slice";
import {setupListeners} from "@reduxjs/toolkit/query";


export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([]),
});

// setupListeners(store.dispatch);

export type AppDispatch = ThunkDispatch<RootState, AppDispatch, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
