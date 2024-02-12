'use client'

import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { EditableProfileGeneralInfo } from '@/features/editableProfileGeneralInfo'
import { Suspense, memo, useCallback, useMemo } from 'react'
import { Flex, VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ProfileSettingValue, ProfileSettingsTab } from '@/features/editableProfileGeneralInfo'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { Tab, Tabs } from '@/shared/ui/Tabs/Tabs'
import cls from './ProfileSettingsPage.module.scss'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { UserRole } from '@/shared/lib/HOC/withAuth/routes'
import { AccountManagement } from '@/_pages/ProfileSettingsPage/ui/AccountManagement/AccountManagement'

type ProfileSettingsPageProps = {
  className?: string
  initialTabValue?: ProfileSettingValue
}

const mapProfileSettings = {
  [ProfileSettingValue.GENERAL_INFO]: <EditableProfileGeneralInfo />,
  [ProfileSettingValue.DEVICES]: <h1>Devices</h1>,
  [ProfileSettingValue.ACCOUNT_MANAGMENT]: <AccountManagement />,
  [ProfileSettingValue.PAYMENTS]: <h1>Payments</h1>,
}

export const ProfileSettingsPage = ({ className, initialTabValue }: ProfileSettingsPageProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const editableSearchParams = new URLSearchParams(Array.from(searchParams.entries()))
  const currentTabValue =
    (editableSearchParams.get('setting') as ProfileSettingValue) || initialTabValue

  if (!currentTabValue) {
    editableSearchParams.set('setting', ProfileSettingValue.GENERAL_INFO)
    redirect(`${pathname}?${editableSearchParams.toString()}`)
  }

  const handleTabClick = useCallback((tab: ProfileSettingsTab) => {
    editableSearchParams.set('setting', tab.value)
    router.push(`${pathname}?${editableSearchParams.toString()}`)
  }, [])

  return (
    <VStack gap="24" max className={classNames(cls.ProfileSettings, {}, [className])}>
      <ProfileSettingsHeader tabValue={currentTabValue} handleTabClick={handleTabClick} />
      <Suspense
        fallback={
          <ProfileSettingsSkeleton
            isWithAvatar={currentTabValue == ProfileSettingValue.GENERAL_INFO}
          />
        }
      >
        {mapProfileSettings[currentTabValue]}
      </Suspense>
    </VStack>
  )
}

type ProfileSettingsHeaderProps = {
  tabValue: ProfileSettingValue
  handleTabClick: (tab: Tab<ProfileSettingValue>) => void
}

const ProfileSettingsHeader = memo(({ tabValue, handleTabClick }: ProfileSettingsHeaderProps) => {
  const { t } = useClientTranslation(Namespaces.PROFILE_SETTINGS)

  const tabs: ProfileSettingsTab[] = useMemo(
    () => [
      {
        value: ProfileSettingValue.GENERAL_INFO,
        content: <span className={cls.item}>{t('tabs.general-info')}</span>,
      },
      {
        value: ProfileSettingValue.DEVICES,
        content: <span className={cls.item}>{t('tabs.devices')}</span>,
      },
      {
        value: ProfileSettingValue.ACCOUNT_MANAGMENT,
        content: <span className={cls.item}>{t('tabs.account-managment')}</span>,
      },
      {
        value: ProfileSettingValue.PAYMENTS,
        content: <span className={cls.item}>{t('tabs.payments')}</span>,
      },
    ],
    [t],
  )

  return (
    <Tabs
      className={cls.tabs}
      tabs={tabs}
      value={tabValue}
      onTabClick={handleTabClick}
      justifyChild="center"
      withUnderline
      name="header"
    />
  )
})

ProfileSettingsHeader.displayName = 'ProfileSettingsHeader'

const ProfileSettingsSkeleton = ({ isWithAvatar }: { isWithAvatar: boolean }) => {
  const matches = useMediaQuery('(max-width: 768px)')
  const direction = matches ? 'column' : 'row'
  const align = direction == 'column' ? 'center' : 'start'

  return (
    <Flex gap="24" align={align} direction={direction} max>
      {isWithAvatar ? (
        !matches ? (
          <Skeleton width={300} height={300} />
        ) : (
          <Skeleton width="inherit" height={80} />
        )
      ) : null}
      <VStack gap="24" max>
        {Array(6)
          .fill('')
          .map((_, i) => {
            return <Skeleton key={i} width="inherit" height={80} border="5px" />
          })}
      </VStack>
    </Flex>
  )
}

export default withAuth(ProfileSettingsPage, {
  routeRole: 'all',
  userRole: UserRole.ADMIN,
})
