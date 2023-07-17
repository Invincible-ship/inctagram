import { rtkApi } from '@/shared/api/rtkApi'
import { AxiosInstance } from 'axios'

export type StateSchema = {
  // Остальные типы ваших редьюсеров
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}

export type ThunkExtraArg = {
  api: AxiosInstance
}

export type ThunkConfig<T> = {
  rejectValue: T,
  extra: ThunkExtraArg,
  state: StateSchema
}