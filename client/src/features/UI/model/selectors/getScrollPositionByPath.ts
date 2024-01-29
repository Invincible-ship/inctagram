import { StateSchema } from '@/providers/StoreProvider'
import { createSelector } from '@reduxjs/toolkit'

const getUIScroll = (state: StateSchema) => state.ui.scroll
const getPathname = (state: StateSchema, pathname: string) => pathname

export const getScrollPositionByPath = createSelector(
  [getUIScroll, getPathname],
  (scroll, pathname) => scroll[pathname] || 0,
)
