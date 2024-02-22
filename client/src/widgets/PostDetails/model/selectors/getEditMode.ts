import { StateSchema } from '@/providers/StoreProvider'

export const getEditMode = (state: StateSchema) => state.postDetails.editMode
