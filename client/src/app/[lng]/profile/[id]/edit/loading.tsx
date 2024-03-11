import { ProfileSettingsSkeleton } from '@/_pages/ProfileSettingsPage/ui/ProfileSettingsPage/ProfileSettingsPage'
import { headers } from 'next/headers'

const Loading = () => {
  const mobileHeader = headers().get('is-mobile')
  const mobile = mobileHeader ? (JSON.parse(mobileHeader) as boolean) : false

  return <ProfileSettingsSkeleton mobile={mobile} />
}

export default Loading
