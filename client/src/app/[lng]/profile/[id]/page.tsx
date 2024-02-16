import { ProfilePageClient } from '@/_pages/ProfilePage'
import { IViewer } from '@/entities/Viewer'
import { useServerTranslation } from '@/shared/config/i18n/server'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { GET_PUBLIC_USER_PROFILE, GET_USERS_TOTAL_COUNT } from '@/shared/const/apiEndpoints'
import { PROFILE_TAG, VIEWER_TAG } from '@/shared/const/rtk'

export const dynamic = 'force-static'

type ProfilePageParams = {
  id: string
  lng: LanguageIds
}

type ProfilePageProps = {
  params: ProfilePageParams
}

const API = process.env.API
const totalUsersCountEndpoint = `${API}${GET_USERS_TOTAL_COUNT}`
const profileEndpoint = (id: string) => `${API}${GET_PUBLIC_USER_PROFILE}/${id}`

export const generateStaticParams = async () => {
  const totalUsersCountResponse = await fetch(totalUsersCountEndpoint, {
    next: { revalidate: 3600, tags: [VIEWER_TAG] },
  })
  const totalUsersCount = await totalUsersCountResponse.json()

  return Array.from({ length: totalUsersCount }).map((_, idx) => ({
    id: String(++idx),
  }))
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { id: profileId } = params

  const profileResponse = await fetch(profileEndpoint(profileId), {
    next: { revalidate: 60, tags: [PROFILE_TAG] },
  })
  let profile

  try {
    profile = await profileResponse.json()
  } catch (err) {
    profile = undefined
  }

  return <ProfilePageClient profile={profile} />
}

export default ProfilePage
