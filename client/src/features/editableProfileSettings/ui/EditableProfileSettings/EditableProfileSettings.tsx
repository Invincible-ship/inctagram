import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { EditableProfileSettingsHeader } from '../EditableProfileSettingsHeader/EditableProfileSettingsHeader'
import cls from './EditableProfileSettings.module.scss'
import { EditableProfileGeneralInfo } from '../EditableProfileGeneralInfo/EditableProfileGeneralInfo'
import { useCallback } from 'react'
import { ProfileSettingTab, ProfileSettingValue } from '../../model/types'

const mapProfileSettings = {
  [ProfileSettingValue.GENERAL_INFO]: <EditableProfileGeneralInfo />,
  [ProfileSettingValue.DEVICES]: <>Devices</>,
  [ProfileSettingValue.ACCOUNT_MANAGMENT]: <>Account Managment</>,
  [ProfileSettingValue.PAYMENTS]: <>Payments</>,
}

export const EditableProfileSettings = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const editableSearchParams = new URLSearchParams(Array.from(searchParams.entries()))
  const currentTabValue = editableSearchParams.get('setting') as ProfileSettingValue

  if (!currentTabValue) {
    editableSearchParams.set('setting', ProfileSettingValue.GENERAL_INFO)
    redirect(`${pathname}?${editableSearchParams.toString()}`)
  }

  const handleTabClick = useCallback((tab: ProfileSettingTab) => {
    editableSearchParams.set('setting', tab.value)
    router.push(`${pathname}?${editableSearchParams.toString()}`)
  }, [])

  return (
    <div className={cls.ProfileSettings}>
      <EditableProfileSettingsHeader
        currentTabValue={currentTabValue}
        handleTabClick={handleTabClick}
      />
      <section>{mapProfileSettings[currentTabValue]}</section>
    </div>
  )
}
