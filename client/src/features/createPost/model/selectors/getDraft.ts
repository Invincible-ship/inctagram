import { StateSchema } from '@/providers/StoreProvider'
import { createSelector } from '@reduxjs/toolkit'

export const getDraft = createSelector(
  (state: StateSchema) => state.createPost,
  ({ draft }) => draft,
)
