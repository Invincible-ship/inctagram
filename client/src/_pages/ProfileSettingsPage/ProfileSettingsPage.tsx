'use client'

import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { EditableProfileGeneralInfo } from '@/features/editableProfileGeneralInfo'
import { FC, Suspense, memo, useCallback, useContext, useMemo } from 'react'
import { Flex, VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ProfileSettingValue, ProfileSettingsTab } from '@/features/editableProfileGeneralInfo'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { Namespaces } from '@/shared/config/i18n/types'
import { Tab, Tabs } from '@/shared/ui/Tabs/Tabs'
import cls from './ProfileSettingsPage.module.scss'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { UserRole } from '@/shared/lib/HOC/withAuth/routes'

type ProfileSettingsPageProps = {
  className?: string
}

const mapProfileSettings = {
  [ProfileSettingValue.GENERAL_INFO]: <EditableProfileGeneralInfo />,
  [ProfileSettingValue.DEVICES]: <h1>Devices</h1>,
  [ProfileSettingValue.ACCOUNT_MANAGMENT]: <h1>Account Managment</h1>,
  [ProfileSettingValue.PAYMENTS]: <h1>Payments</h1>,
}

const ProfileSettingsPage = ({ className }: ProfileSettingsPageProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const editableSearchParams = new URLSearchParams(Array.from(searchParams.entries()))
  const currentTabValue = editableSearchParams.get('setting') as ProfileSettingValue

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
  const lngId = useContext(LanguageContext)
  const { t } = useClientTranslation(lngId, Namespaces.PROFILE_SETTINGS)

  const tabs: ProfileSettingsTab[] = useMemo(
    () => [
      { value: ProfileSettingValue.GENERAL_INFO, content: t('tabs.general-info') },
      { value: ProfileSettingValue.DEVICES, content: t('tabs.devices') },
      { value: ProfileSettingValue.ACCOUNT_MANAGMENT, content: t('tabs.account-managment') },
      { value: ProfileSettingValue.PAYMENTS, content: t('tabs.payments') },
    ],
    [t],
  )

  return <Tabs className={cls.tabs} tabs={tabs} value={tabValue} onTabClick={handleTabClick} />
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
