import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";

const slice = createSlice({
    name: "app",
    initialState: {
        error: null as string | null,
        isLoading: false,
        isAppInitialized: false,
    },
    reducers: {
        setIsLoading: (state: {isLoading: boolean}, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading;
        },
        setError: (state: {error}, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state:{isLoading}, action) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state:{isLoading, error}, action) => {
                    state.isLoading = false;
                    if (!action.payload.showGlobalError) return;
                    const err = action.payload.e as Error | AxiosError<{ error: string }>;
                    if (isAxiosError(err)) {
                        state.error = err.response ? err.response.data.error : err.message;
                    } else {
                        state.error = `Native error ${err.message}`;
                    }
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state: {isLoading}, action) => {
                    state.isLoading = false;
                }
            );
    },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
