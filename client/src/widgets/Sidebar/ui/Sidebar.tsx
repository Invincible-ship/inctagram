'use client'

import { Tab, Tabs } from '@/shared/ui/Tabs/Tabs'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FC, memo, useContext, useMemo, useState, MouseEvent } from 'react'
import { SidebarValues } from '../types'
import cls from './Sidebar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import Link from 'next/link'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { SignOut } from '@/features/auth/signout'
import { LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'
import { getSidebarItems } from '../model/utils/getSidebarItems'
import { usePathname, useSearchParams } from 'next/navigation'
import { getTabs } from '../model/utils/getTabs'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { getSidebarInitialValue } from '../model/utils/getSidebarInitialValue'

export type SidebarItemProps = {
  value: SidebarValues
  text: string
  href: string
  Icon: FC<React.SVGProps<SVGSVGElement>>
  className?: string
}

export const SidebarItem: FC<SidebarItemProps> = ({ value, text, href, Icon, className }) => {
  const onLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (value !== SidebarValues.CREATE) return
    e.preventDefault()
    history.pushState(null, '', href)
  }

  return (
    <Link
      className={classNames(cls.sidebarItem, {}, [className])}
      href={href}
      onClick={onLinkClick}
    >
      <HStack gap="16" align="center">
        <Icon />
        <span className={classNames(cls.sidebarText)}>{text}</span>
      </HStack>
    </Link>
  )
}

export const Sidebar = memo(() => {
  const pathname = usePathname()
  const sp = useSearchParams()
  const lngId = useContext(LanguageContext) as LanguageIds
  const [value, setValue] = useState<SidebarValues>(getSidebarInitialValue(pathname))
  const { t } = useClientTranslation(Namespaces.SIDEBAR)
  const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY) as string
  const mobile = useMediaQuery('(max-width: 769px)')
  const direction = mobile ? 'row' : 'column'
  const justify = direction == 'row' ? 'stretch' : 'start'

  const onTabClick = (tab: Tab<SidebarValues>) => setValue(tab.value)

  const editableSearchParams = useMemo(() => new URLSearchParams(Array.from(sp)), [sp])

  const { majorTabs, additionalTabs } = useMemo(() => {
    const sidebarItems = getSidebarItems(userId, t, editableSearchParams)

    const majorTabs = getTabs(sidebarItems, {
      type: 'major',
      lngId,
    })
    const additionalTabs = getTabs(sidebarItems, { type: 'additional', lngId })

    return { majorTabs, additionalTabs }
  }, [userId, lngId, t, editableSearchParams])

  return (
    <div className={cls.SidebarWrapper}>
      <VStack className={cls.sidebar} justify={justify} gap={!mobile ? '48' : undefined} max>
        <Tabs
          direction={direction}
          gap={!mobile ? '16' : undefined}
          justifyChild={mobile ? 'center' : 'start'}
          tabs={majorTabs}
          value={value}
          onTabClick={onTabClick}
          textColor="var(--primary-text-color)"
        />
        {!mobile && (
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
})

Sidebar.displayName = 'Sidebar'

export const SidebarSkeleton = ({ mobile }: { mobile?: boolean }) =>
  !mobile ? (
    <VStack className={cls.skeleton} justify="between">
      <VStack gap="48" max>
        <VStack gap="24" max>
          <Skeleton width="100%" height="40px" border="15px" />
          <Skeleton width="100%" height="40px" border="15px" />
          <Skeleton width="100%" height="40px" border="15px" />
          <Skeleton width="100%" height="40px" border="15px" />
          <Skeleton width="100%" height="40px" border="15px" />
        </VStack>
        <VStack gap="24" max>
          <Skeleton width="100%" height="40px" border="15px" />
          <Skeleton width="100%" height="40px" border="15px" />
        </VStack>
      </VStack>
      <VStack max>
        <Skeleton width="100%" height="40px" border="15px" />
      </VStack>
    </VStack>
  ) : null
