import { LanguageIds } from '@/shared/config/i18n/types'
import { SidebarItem } from '../Sidebar'
import { SidebarValues, TSidebarItemsSchema, TSidebarTab } from '../types'
import { CreatePost } from '@/features/createPost'

export type TabsOptions = {
  type: keyof TSidebarItemsSchema
  lngId?: LanguageIds
  searchParams?: URLSearchParams
}

export const getTabs = (
  items: TSidebarItemsSchema,
  { type, lngId = LanguageIds.RU, searchParams = new URLSearchParams() }: TabsOptions,
): TSidebarTab[] =>
  items[type].map(({ value, text, href, Icon }) => ({
    value,
    content:
      value != SidebarValues.CREATE ? (
        <SidebarItem
          key={value}
          text={text}
          href={`/${lngId}${href}`}
          className={value}
          Icon={Icon}
        />
      ) : (
        <>
          <SidebarItem
            key={value}
            text={text}
            href={`${href}${searchParams.size ? `&${searchParams.toString()}` : ''}`}
            className={value}
            Icon={Icon}
          />
          <CreatePost />
        </>
      ),
  }))
