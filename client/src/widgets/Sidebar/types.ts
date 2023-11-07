import { Routes } from '@/shared/types/routes'
import { Tab } from '@/shared/ui/Tabs/Tabs'
import { FC } from 'react'

export enum SidebarValues {
  HOME = 'home',
  CREATE = 'create',
  PROFILE = 'profile',
  MESSENGER = 'messenger',
  SEARCH = 'search',
  STATISTICS = 'statistics',
  FAVORITES = 'favorites',
}

export type SidebarItem = {
  value: SidebarValues
  text: string
  href: Routes | `${Routes}${string}` | '#'
  Icon: FC
}

export type TSidebarItemsSchema = Record<'major' | 'additional', SidebarItem[]>

export type TSidebarTab = Tab<SidebarValues>
