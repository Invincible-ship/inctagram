import {rtkApi} from '@/shared/api/rtkApi'
import {AxiosInstance} from 'axios'
import {signInReducer} from "@/features/auth/signIn/model/slice/signInSlice"

export type StateSchema = {
  // Остальные типы ваших редьюсеров
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>,
  signInReducer: ReturnType<typeof signInReducer>
}

export type ThunkExtraArg = {
  api: AxiosInstance
}

export type ThunkConfig<T> = {
  rejectValue: T,
  extra: ThunkExtraArg,
  state: StateSchema
}