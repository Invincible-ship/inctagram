import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "@/providers/Provider/config/store"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: unknown;
}>()
