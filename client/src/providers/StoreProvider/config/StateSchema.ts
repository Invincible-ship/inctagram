import { rtkApi } from '@/shared/api/rtkApi';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { signupReducer } from '@/features/auth/signup/model/slice/signUpSlice';
import {signInReducer} from "@/features/auth/signIn/model/slice/signInSlice"

export type StateSchema = {
  // Остальные типы ваших редьюсеров
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  signIn: ReturnType<typeof signInReducer>
  signup: ReturnType<typeof signupReducer>
};

export type ThunkExtraArg = {
  api: AxiosInstance;
};

export type ThunkConfig<T> = {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
};
