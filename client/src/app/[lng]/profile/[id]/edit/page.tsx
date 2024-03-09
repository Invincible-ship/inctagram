import ProfileSettingPage from '@/_pages/ProfileSettingsPage/ui/ProfileSettingsPage/ProfileSettingsPage'
import { Suspense } from 'react'
import Loader from './loading'
import { headers } from 'next/headers'

const Page = async () => {
  const mobileHeader = headers().get('is-mobile')
  const mobile = mobileHeader ? (JSON.parse(mobileHeader) as boolean) : false

  return (
    <Suspense fallback={<Loader mobile={mobile} />}>
      <ProfileSettingPage />
    </Suspense>
  )
}

export default Page
