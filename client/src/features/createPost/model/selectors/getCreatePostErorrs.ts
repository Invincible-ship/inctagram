import { StateSchema } from '@/providers/StoreProvider'
import { createSelector } from '@reduxjs/toolkit'

export const getCreatePostErorrs = createSelector(
  [(state: StateSchema) => state.createPost],
  createPost => createPost.errors,
)
