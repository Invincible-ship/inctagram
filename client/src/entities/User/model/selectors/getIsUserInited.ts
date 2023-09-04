import { StateSchema } from '@/providers/StoreProvider'

export const getIsUserInited = (state: StateSchema) => state.user._inited
