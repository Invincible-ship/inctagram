'use client'

import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { EditableProfileSettingsHeader } from '../EditableProfileSettingsHeader/EditableProfileSettingsHeader'
import cls from './EditableProfileSettings.module.scss'
import { EditableProfileGeneralInfo } from '../EditableProfileGeneralInfo/EditableProfileGeneralInfo'
import { FC, Suspense, useCallback, useMemo } from 'react'
import { Flex, HStack, VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ProfileSettingValue, ProfileSettingsTab } from '../../model/types/types'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'

type EditableProfileSettingsProps = {
  className?: string
}

const mapProfileSettings = {
  [ProfileSettingValue.GENERAL_INFO]: <EditableProfileGeneralInfo />,
  [ProfileSettingValue.DEVICES]: <h1>Devices</h1>,
  [ProfileSettingValue.ACCOUNT_MANAGMENT]: <h1>Account Managment</h1>,
  [ProfileSettingValue.PAYMENTS]: <h1>Payments</h1>,
}

export const EditableProfileSettings: FC<EditableProfileSettingsProps> = ({ className }) => {
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
      <EditableProfileSettingsHeader tabValue={currentTabValue} handleTabClick={handleTabClick} />
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

const ProfileSettingsSkeleton = ({ isWithAvatar }: { isWithAvatar: boolean }) => {
  const matches = useMediaQuery('(max-width: 768px)')
  const direction = matches ? 'column' : 'row'
  const align = direction == 'column' ? 'center' : 'start'

  return (
    <Flex gap="24" align={align} direction={direction} max>
      {isWithAvatar && !matches ? (
        <Skeleton width={300} height={300} />
      ) : (
        <Skeleton width="inherit" height={80} />
      )}
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
