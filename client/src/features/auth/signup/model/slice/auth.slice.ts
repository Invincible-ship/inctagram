import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/shared/lib/utils/createAppAsyncThunk";
import { thunkTryCatch } from "@/shared/lib/utils/thunk-try-catch";
import { authApi, RegisterParamsType, RegisterResponseType } from "@/features/auth/auth.api";

const register = createAppAsyncThunk<RegisterResponseType, RegisterParamsType>(
    "auth/register",
    async (arg, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
            await authApi.register(arg);
        });
    },
);

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state: { isLoggedIn: boolean }, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
    extraReducers: (builder) => {},
});

export const authReducer = slice.reducer;
export const authThunks = { register };
export const authActions = slice.actions;