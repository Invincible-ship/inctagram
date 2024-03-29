'use client'

import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, lazy, memo, useCallback, useMemo } from 'react'
import { HStack, VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  EditableProfileGeneralInfoSkeleton,
  ProfileSettingValue,
  ProfileSettingsTab,
} from '@/features/editableProfileGeneralInfo'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { Tab, Tabs } from '@/shared/ui/Tabs/Tabs'
import cls from './ProfileSettingsPage.module.scss'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { UserRole } from '@/shared/lib/HOC/withAuth/routes'
import { DevicesSkeleton } from '../Devices/Devices'
import { CurrentSubscriptionsSkeleton } from '@/entities/Subscription'
import { SubscriptionsPaymentsSkeleton } from '../SubscriptionPayments/SubscriptionsPayments'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

const EditableProfileGeneralInfo = lazy(() =>
  import('@/features/editableProfileGeneralInfo').then(mod => ({
    default: mod.EditableProfileGeneralInfo,
  })),
)
const AccountManagement = lazy(() =>
  import('../AccountManagement/AccountManagement').then(mod => ({
    default: mod.AccountManagement,
  })),
)
const SubscriptionsPayments = lazy(() =>
  import('../SubscriptionPayments/SubscriptionsPayments').then(mod => ({
    default: mod.SubscriptionsPayments,
  })),
)
const Devices = lazy(() => import('../Devices/Devices').then(mod => ({ default: mod.Devices })))

type ProfileSettingsPageProps = {
  className?: string
  initialTabValue?: ProfileSettingValue
}

const mapProfileSettings = {
  [ProfileSettingValue.GENERAL_INFO]: EditableProfileGeneralInfo,
  [ProfileSettingValue.DEVICES]: Devices,
  [ProfileSettingValue.ACCOUNT_MANAGMENT]: AccountManagement,
  [ProfileSettingValue.PAYMENTS]: SubscriptionsPayments,
}
const mapProfileSettingsToSkeleton = {
  [ProfileSettingValue.GENERAL_INFO]: <EditableProfileGeneralInfoSkeleton />,
  [ProfileSettingValue.DEVICES]: <DevicesSkeleton />,
  [ProfileSettingValue.ACCOUNT_MANAGMENT]: <CurrentSubscriptionsSkeleton />,
  [ProfileSettingValue.PAYMENTS]: <SubscriptionsPaymentsSkeleton />,
}

export const ProfileSettingsPage = ({ className, initialTabValue }: ProfileSettingsPageProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const editableSearchParams = new URLSearchParams(Array.from(searchParams))
  const currentTabValue =
    (editableSearchParams.get('setting') as ProfileSettingValue) || initialTabValue

  if (!currentTabValue) {
    editableSearchParams.set('setting', ProfileSettingValue.GENERAL_INFO)
    redirect(`${pathname}?${editableSearchParams.toString()}`)
  }

  const handleTabClick = useCallback((tab: ProfileSettingsTab) => {
    editableSearchParams.set('setting', tab.value)
    // router.push(`${pathname}?${editableSearchParams.toString()}`)
    history.pushState(null, '', `?${editableSearchParams.toString()}`)
  }, [])

  const CurrentTabComponent = mapProfileSettings[currentTabValue]

  return (
    <VStack gap="24" max className={classNames(cls.ProfileSettings, {}, [className])}>
      <ProfileSettingsHeader tabValue={currentTabValue} handleTabClick={handleTabClick} />
      <Suspense fallback={mapProfileSettingsToSkeleton[currentTabValue]}>
        <CurrentTabComponent />
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

export const ProfileSettingsSkeleton = ({ mobile }: { mobile?: boolean }) => {
  return (
    <VStack gap="24" max>
      <HStack gap="8" wrap="nowrap" justify="stretch" max>
        <Skeleton width="25%" height="40px" border="5px" />
        <Skeleton width="25%" height="40px" border="5px" />
        <Skeleton width="25%" height="40px" border="5px" />
        <Skeleton width="25%" height="40px" border="5px" />
      </HStack>
      <EditableProfileGeneralInfoSkeleton mobile={mobile} />
    </VStack>
  )
}

export default withAuth<ProfileSettingsPageProps>(ProfileSettingsPage, {
  routeRole: 'all',
  userRole: UserRole.ADMIN,
})
