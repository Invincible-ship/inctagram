import {configureStore, ThunkAction, Action, ThunkDispatch, AnyAction} from "@reduxjs/toolkit";

import {setupListeners} from "@reduxjs/toolkit/query";
import {signUpApi} from "@/features/auth/signup/model/api/signUpApi";


export const  store = configureStore( {
        reducer: {
            [signUpApi.reducerPath]: signUpApi.reducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signUpApi.middleware),
    });

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch ;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;



// import {configureStore, ThunkAction, Action, ThunkDispatch, AnyAction} from "@reduxjs/toolkit";
// import {signUpApi} from "@/features/auth/signup/model/api/signUpApi";
//
// export function makeStore() {
//     return configureStore({
//         reducer: {
//             [signUpApi.reducerPath]: signUpApi.reducer
//         },
//         middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signUpApi.middleware),
//     });
// }
//
// const store = makeStore();
//
// export type AppStore = ReturnType<typeof makeStore>;
//
// export type RootState = ReturnType<typeof store.getState>;
//
// export type AppDispatch = ThunkDispatch<RootState, AppDispatch, AnyAction>;
//
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
//
// export default store;