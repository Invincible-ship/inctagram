import { StateSchema } from '@/app/providers/StoreProvider'

export const getEditMode = (state: StateSchema) => state.postDetails.editMode
