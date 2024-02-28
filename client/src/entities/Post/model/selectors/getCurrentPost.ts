import { StateSchema } from '@/app/providers/StoreProvider'
import { createSelector } from '@reduxjs/toolkit'

export const getCurrentPost = createSelector(
  (state: StateSchema) => state.post,
  post => post.post,
)
