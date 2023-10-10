import { memo, useContext, useMemo } from 'react'
import { ProfileSettingsTab, ProfileSettingValue } from '@/entities/Profile'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { Tab, Tabs } from '@/shared/ui/Tabs/Tabs'
import cls from './EditableProfileSettingsHeader.module.scss'

type EditableProfileSettingsHeaderProps = {
  tabValue: ProfileSettingValue
  handleTabClick: (tab: Tab<ProfileSettingValue>) => void
}

export const EditableProfileSettingsHeader = memo(
  ({ tabValue, handleTabClick }: EditableProfileSettingsHeaderProps) => {
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
  },
)

EditableProfileSettingsHeader.displayName = 'EditableProfileSettingsHeader'
