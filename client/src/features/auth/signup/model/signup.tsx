import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  RegisterParamsType,
  RegisterResponseType,
} from '@/features/auth/signup/model/types/types';
import { ThunkConfig } from '@/providers/StoreProvider';
import { userApi } from '@/entities/User';
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError';
import { UseFormSetError } from 'react-hook-form';

type SignupThunkPayload = {
  body: RegisterParamsType;
  setError: UseFormSetError<RegisterParamsType>;
};

export const signupThunk = createAsyncThunk<
  RegisterResponseType,
  SignupThunkPayload,
  ThunkConfig<string>
>('auth/signup', async ({ body, setError }, thunkAPI) => {
  try {
    await thunkAPI.dispatch(userApi.endpoints.signup.initiate(body)).unwrap();
  } catch (error) {
    if (isFetchBaseQueryError(error)) {
      if (error.data && error.data.errors) {
        for (const err of error.data.errors) {
          setError(err.field, {
            type: 'server',
            message: err.message,
          });
        }
      } else if (typeof error.data === 'string') {
        throw new Error(error.data);
      }
    }
    return thunkAPI.rejectWithValue(error);
  }
});
