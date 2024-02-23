import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsUserInited = (state: StateSchema) => state.user._inited
