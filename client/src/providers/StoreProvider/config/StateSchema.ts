import { rtkApi } from '@/shared/api/rtkApi'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { signupReducer } from '@/features/auth/signup/model/slice/signUpSlice'

export type StateSchema = {
  // Остальные типы ваших редьюсеров
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  signup: ReturnType<typeof signupReducer>;
};

export type ThunkExtraArg = {
  api: AxiosInstance;
};

export type ThunkConfig<T> = {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
};
