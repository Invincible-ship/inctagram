import { ProfileSettingsSkeleton } from '@/_pages/ProfileSettingsPage/ui/ProfileSettingsPage/ProfileSettingsPage'

const Loading = ({ mobile }: { mobile?: boolean }) => {
  return <ProfileSettingsSkeleton mobile={mobile} />
}

export default Loading
