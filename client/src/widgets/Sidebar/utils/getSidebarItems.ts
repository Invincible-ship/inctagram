import { Routes } from '@/shared/types/routes'
import { SidebarValues, TSidebarItemsSchema } from '../types'
import HomeIcon from '@/shared/assets/icons/home.svg'
import CreateIcon from '@/shared/assets/icons/plus-square-outline.svg'
import AccountIcon from '@/shared/assets/icons/person.svg'
import MessengerIcon from '@/shared/assets/icons/message-circle.svg'
import SearchIcon from '@/shared/assets/icons/search.svg'
import TrendingIcon from '@/shared/assets/icons/trending-up.svg'
import BookmarkIcon from '@/shared/assets/icons/bookmark.svg'
import { TFunction } from 'i18next'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'

export const getSidebarItems = (
  userId: string,
  t: TFunction<Namespaces, undefined>,
): TSidebarItemsSchema => {
  return {
    major: [
      {
        value: SidebarValues.HOME,
        text: t('home'),
        href: `${Routes.MAIN}`,
        Icon: HomeIcon,
      },
      {
        value: SidebarValues.CREATE,
        text: t('create'),
        href: '?createPost=true',
        Icon: CreateIcon,
      },
      {
        value: SidebarValues.PROFILE,
        text: t('profile'),
        href: `${Routes.PROFILE}/${userId}`,
        Icon: AccountIcon,
      },
      { value: SidebarValues.MESSENGER, text: t('messenger'), href: '#', Icon: MessengerIcon },
      { value: SidebarValues.SEARCH, text: t('search'), href: '#', Icon: SearchIcon },
    ],
    additional: [
      { value: SidebarValues.STATISTICS, text: t('statistics'), href: '#', Icon: TrendingIcon },
      { value: SidebarValues.FAVORITES, text: t('favorites'), href: '#', Icon: BookmarkIcon },
    ],
  }
}
