import { StateSchema } from '@/app/providers/StoreProvider'

export const getTempValues = (state: StateSchema) => state.profile.tempValues
