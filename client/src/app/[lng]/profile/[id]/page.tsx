// import { ProfilePageClient } from '@/_pages/ProfilePage'
import { IViewer } from '@/entities/Viewer'
import { LanguageIds } from '@/shared/config/i18n/types'
import { GET_PUBLIC_USER_PROFILE, GET_USERS_TOTAL_COUNT } from '@/shared/const/apiEndpoints'
import { VIEWER_TAG } from '@/shared/const/rtk'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
const ProfilePageClient = dynamic(() => import('@/_pages/ProfilePage/ui/ProfilePage/ProfilePage'), {
  ssr: false,
})

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

const getProfile = async (profileId: string) => {
  const profileResponse = await fetch(profileEndpoint(profileId), {
    next: { revalidate: 3600, tags: [VIEWER_TAG] },
  })

  if (!profileResponse.ok) {
    notFound()
  }

  return await profileResponse.json()
}

// export const generateStaticParams = async () => {
//   const totalUsersCountResponse = await fetch(totalUsersCountEndpoint, {
//     next: { revalidate: 3600, tags: [VIEWER_TAG] },
//   })
//   const totalUsersCount = await totalUsersCountResponse.json()

//   return Array.from({ length: totalUsersCount }).map((_, idx) => ({
//     id: String(++idx),
//   }))
// }

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { id: profileId } = params

  const profile: IViewer = await getProfile(profileId)

  return <ProfilePageClient profile={profile} />
}

export default ProfilePage
