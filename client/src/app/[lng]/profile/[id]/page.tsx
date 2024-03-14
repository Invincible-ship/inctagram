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

const ProfilePage = async ({ params, searchParams }: ProfilePageProps) => {
  const { id: profileId } = params

  const publicProfileData = fetchPublicProfile(profileId)
  const postsData = fetchProfilePosts(profileId, searchParams)

  const [publicProfile, posts] = await Promise.all([publicProfileData, postsData])

  return <ProfilePageClient publicProfile={publicProfile} posts={posts} />
}

export default ProfilePage
