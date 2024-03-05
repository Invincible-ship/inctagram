import { LanguageIds } from '@/shared/config/i18n/types'
import { SidebarItem } from '../../ui/Sidebar'
import { SidebarValues, TSidebarItemsSchema, TSidebarTab } from '../../types'

export type TabsOptions = {
  type: keyof TSidebarItemsSchema
  lngId?: LanguageIds
}

export const getTabs = (
  items: TSidebarItemsSchema,
  { type, lngId = LanguageIds.RU }: TabsOptions,
): TSidebarTab[] =>
  items[type].map(({ value, text, href: originalHref, Icon }) => {
    const href = value != SidebarValues.CREATE ? `/${lngId}${originalHref}` : originalHref

    return {
      value,
      content: <SidebarItem key={value} text={text} href={href} className={value} Icon={Icon} />,
    }
  })
