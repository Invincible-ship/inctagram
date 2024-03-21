import ProfilePageClient from '@/_pages/ProfilePage/ui/ProfilePage/ProfilePage'
import { fetchProfilePosts, fetchPublicProfile } from '@/entities/Viewer'
import { LanguageIds } from '@/shared/config/i18n/types'
import { PostSortField } from '@/shared/const/postSortField'
import { SortOrder } from '@/shared/types/sort'

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
