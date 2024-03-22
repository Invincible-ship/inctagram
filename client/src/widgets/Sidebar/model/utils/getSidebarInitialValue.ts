import { SidebarValues } from '../types/types'

const map: Record<string, SidebarValues> = {
  home: SidebarValues.HOME,
  profile: SidebarValues.PROFILE,
  search: SidebarValues.SEARCH,
  favorites: SidebarValues.FAVORITES,
}

export const getSidebarInitialValue = (path: string) => {
  // first segment is language
  // if after language there's no segment, so it is home
  const key = path.split('/').slice(1).at(1) || 'home'
  return map[key]
}
