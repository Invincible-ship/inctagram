import { FC, memo } from 'react'
import { ProfileSettingTab, ProfileSettingValue } from '../../model/types'

type EditableProfileSettingsHeaderProps = {
  currentTabValue: ProfileSettingValue
  handleTabClick: (tab: ProfileSettingTab) => void
}

export const EditableProfileSettingsHeader: FC<EditableProfileSettingsHeaderProps> = memo(
  ({ currentTabValue, handleTabClick }) => {
    return (
      <>
        <h1>Profile Settings Header</h1>
        <div onClick={e => {}}></div>
      </>
    )
  },
)

EditableProfileSettingsHeader.displayName = 'EditableProfileSettingsHeader'
