import { Tab, Tabs } from '@/shared/ui/Tabs/Tabs'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FC, useContext, useMemo, useState } from 'react'
import { SidebarValues } from './types'
import cls from './Sidebar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import Link from 'next/link'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { SignOut } from '@/features/auth/signout'
import { Routes } from '@/shared/types/routes'
import HomeIcon from '@/shared/assets/icons/home.svg'
import CreateIcon from '@/shared/assets/icons/plus-square-outline.svg'
import AccountIcon from '@/shared/assets/icons/person.svg'
import MessengerIcon from '@/shared/assets/icons/message-circle.svg'
import SearchIcon from '@/shared/assets/icons/search.svg'
import TrendingIcon from '@/shared/assets/icons/trending-up.svg'
import BookmarkIcon from '@/shared/assets/icons/bookmark.svg'
import { LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'

let userId
if (typeof window != 'undefined') userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY)

const sidebarItems = {
  major: [
    { value: SidebarValues.HOME, text: 'home', href: Routes.MAIN, Icon: HomeIcon },
    { value: SidebarValues.CREATE, text: 'create', href: '#', Icon: CreateIcon },
    {
      value: SidebarValues.PROFILE,
      text: 'profile',
      href: `${Routes.PROFILE}/${userId}`,
      Icon: AccountIcon,
    },
    { value: SidebarValues.MESSENGER, text: 'messenger', href: '#', Icon: MessengerIcon },
    { value: SidebarValues.SEARCH, text: 'search', href: '#', Icon: SearchIcon },
  ],
  additional: [
    { value: SidebarValues.STATISTICS, text: 'statistics', href: '#', Icon: TrendingIcon },
    { value: SidebarValues.FAVORITES, text: 'favorites', href: '#', Icon: BookmarkIcon },
  ],
}

export type SidebarItemProps = {
  text: string
  href: string
  Icon: FC<React.SVGProps<SVGSVGElement>>
  className?: string
}

export const SidebarItem: FC<SidebarItemProps> = ({ text, href, Icon, className }) => (
  <Link className={classNames(cls.sidebarItem, {}, [className])} href={href}>
    <HStack gap="16" align="center">
      <Icon />
      <span className={classNames(cls.sidebarText, {}, [`${className}-text`])}>{text}</span>
    </HStack>
  </Link>
)

export const Sidebar = () => {
  const [value, setValue] = useState<SidebarValues>(SidebarValues.HOME)
  const lngId = useContext(LanguageContext)
  const { t } = useClientTranslation('', Namespaces.SIDEBAR)
  const matched = useMediaQuery('(max-width: 769px)')
  const direction = matched ? 'row' : 'column'
  const justify = direction == 'row' ? 'stretch' : 'start'

  const onTabClick = (tab: Tab<SidebarValues>) => setValue(tab.value)

  const getTabs = (type: keyof typeof sidebarItems) =>
    sidebarItems[type].map(({ value, text, href, Icon }) => ({
      value,
      content: (
        <SidebarItem
          key={value}
          text={t(text)}
          href={`/${lngId}${href}`}
          className={value}
          Icon={Icon}
        />
      ),
    }))

  const { majorTabs, additionalTabs } = useMemo(() => {
    const majorTabs = getTabs('major')
    const additionalTabs = getTabs('additional')

    return { majorTabs, additionalTabs }
  }, [lngId, t])

  return (
    <div className={cls.SidebarWrapper}>
      <VStack className={cls.sidebar} justify={justify} gap={!matched ? '48' : undefined} max>
        <Tabs
          direction={direction}
          gap={!matched ? '16' : undefined}
          justifyChild={matched ? 'center' : 'start'}
          tabs={majorTabs}
          value={value}
          onTabClick={onTabClick}
          textColor="var(--primary-text-color)"
        />
        {!matched && (
          <>
            <Tabs
              direction={direction}
              gap="16"
              tabs={additionalTabs}
              value={value}
              onTabClick={onTabClick}
              textColor="var(--primary-text-color)"
            />

            <SignOut className={cls.sidebarBtn} />
          </>
        )}
      </VStack>
    </div>
  )
}
