import { StateSchema } from '@/app/providers/StoreProvider'
import { createSelector } from '@reduxjs/toolkit'

export const getUserAuthData = createSelector(
  (state: StateSchema) => state.user?.authData,
  authData => authData,
)
