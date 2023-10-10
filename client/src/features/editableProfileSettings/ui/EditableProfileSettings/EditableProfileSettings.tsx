'use client'

import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { EditableProfileSettingsHeader } from '../EditableProfileSettingsHeader/EditableProfileSettingsHeader'
import cls from './EditableProfileSettings.module.scss'
import { EditableProfileGeneralInfo } from '../EditableProfileGeneralInfo/EditableProfileGeneralInfo'
import { FC, useCallback } from 'react'
import { ProfileSettingsTab, ProfileSettingValue } from '@/entities/Profile'
import { VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'

const mapProfileSettings = {
  [ProfileSettingValue.GENERAL_INFO]: <EditableProfileGeneralInfo />,
  [ProfileSettingValue.DEVICES]: <h1>Devices</h1>,
  [ProfileSettingValue.ACCOUNT_MANAGMENT]: <h1>Account Managment</h1>,
  [ProfileSettingValue.PAYMENTS]: <h1>Payments</h1>,
}

type EditableProfileSettingsProps = {
  className?: string
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
      {mapProfileSettings[currentTabValue]}
    </VStack>
  )
}