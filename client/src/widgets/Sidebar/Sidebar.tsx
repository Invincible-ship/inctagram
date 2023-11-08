import { Tab, Tabs } from '@/shared/ui/Tabs/Tabs'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FC, useContext, useMemo, useState } from 'react'
import { SidebarValues, TSidebarItemsSchema, TSidebarTab } from './types'
import cls from './Sidebar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import Link from 'next/link'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { SignOut } from '@/features/auth/signout'
import { LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'
import { getSidebarItems } from './utils/getSidebarItems'

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
  const { t } = useClientTranslation(Namespaces.SIDEBAR)
  const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY) as string
  const matched = useMediaQuery('(max-width: 769px)')
  const direction = matched ? 'row' : 'column'
  const justify = direction == 'row' ? 'stretch' : 'start'

  const onTabClick = (tab: Tab<SidebarValues>) => setValue(tab.value)

  const getTabs = (items: TSidebarItemsSchema, type: keyof TSidebarItemsSchema): TSidebarTab[] =>
    items[type].map(({ value, text, href, Icon }) => ({
      value,
      content: (
        <SidebarItem
          key={value}
          text={text}
          href={`/${lngId}${href}`}
          className={value}
          Icon={Icon}
        />
      ),
    }))

  const { majorTabs, additionalTabs } = useMemo(() => {
    const sidebarItems = getSidebarItems(userId, t)

    const majorTabs = getTabs(sidebarItems, 'major')
    const additionalTabs = getTabs(sidebarItems, 'additional')

    return { majorTabs, additionalTabs }
  }, [userId, lngId, t])

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
