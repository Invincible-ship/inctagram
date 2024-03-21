import ProfilePageClient from '@/_pages/ProfilePage/ui/ProfilePage/ProfilePage'
import { fetchProfilePosts, fetchPublicProfile } from '@/entities/Viewer'
import { LanguageIds } from '@/shared/config/i18n/types'
import { PostSortField } from '@/shared/const/postSortField'
import { SortOrder } from '@/shared/types/sort'

// const totalUsersCountEndpoint = `${API}${GET_USERS_TOTAL_COUNT}`
// export const generateStaticParams = async () => {
//   const totalUsersCountResponse = await fetch(totalUsersCountEndpoint, {
//     next: { revalidate: 3600, tags: [VIEWER_TAG] },
//   })
//   const totalUsersCount = await totalUsersCountResponse.json()

//   return Array.from({ length: totalUsersCount }).map((_, idx) => ({
//     id: String(++idx),
//   }))
// }

type ProfilePageParams = {
  id: string
  lng: LanguageIds
}

type SearchParams = {
  sort?: PostSortField
  limit?: string
  order?: SortOrder
}

type ProfilePageProps = {
  params: ProfilePageParams
  searchParams: SearchParams
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { id: profileId } = params

  const publicProfile = await fetchPublicProfile(profileId)
  // const postsData = fetchProfilePosts(profileId)

  return <ProfilePageClient publicProfile={publicProfile} />
}

export default ProfilePage
