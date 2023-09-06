'use client'

import { SignInWithThirdPartyServicesPage } from '@/_pages/SignInWithThirdPartyServicesPage/SignInWithThirdPartyServicesPage'
import { ThirdPartyOauthServices } from '@/shared/types/thirdPartyOauthServices'

const Page = () => {
  return <SignInWithThirdPartyServicesPage oauth={ThirdPartyOauthServices.GITHUB} />
}

export default Page
