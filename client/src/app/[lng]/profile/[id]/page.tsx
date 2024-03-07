// import { ProfilePageClient } from '@/_pages/ProfilePage'
import { IViewer, PostListResponse } from '@/entities/Viewer'
import { LanguageIds } from '@/shared/config/i18n/types'
import {
  GET_POSTS_BY_PROFILE_ID,
  GET_PUBLIC_USER_PROFILE,
  GET_USERS_TOTAL_COUNT,
} from '@/shared/const/apiEndpoints'
import { PostSortField } from '@/shared/const/postSortField'
import { VIEWER_TAG } from '@/shared/const/rtk'
import { SortOrder } from '@/shared/types/sort'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
const ProfilePageClient = dynamic(() => import('@/_pages/ProfilePage/ui/ProfilePage/ProfilePage'), {
  ssr: false,
})

const API = process.env.API
const totalUsersCountEndpoint = `${API}${GET_USERS_TOTAL_COUNT}`
const profileEndpoint = (id: string) => `${API}${GET_PUBLIC_USER_PROFILE}/${id}`

const getPublicProfile = async (profileId: string) => {
  const profileResponse = await fetch(profileEndpoint(profileId), {
    next: { tags: [VIEWER_TAG] },
  })

  if (!profileResponse.ok) {
    notFound()
  }

  return await profileResponse.json()
}

const fetchProfilePosts = async (profileId: string, sp: SearchParams) => {
  const baseUrl = process.env.API

  const { limit, sort, order } = sp
  const qp = new URLSearchParams({
    pageSize: limit || '8',
    sortBy: sort || PostSortField.CREATED,
    sortDirection: order || 'desc',
  })

  const response = await fetch(
    `${baseUrl}${GET_POSTS_BY_PROFILE_ID}/${profileId}?${qp.toString()}`,
    {
      next: {
        revalidate: 60,
      },
    },
  )

  if (!response.ok) return undefined

  return (await response.json()) as PostListResponse
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

  const publicProfile: IViewer = await getPublicProfile(profileId)
  const posts: PostListResponse | undefined = await fetchProfilePosts(profileId, searchParams)

  return <ProfilePageClient publicProfile={publicProfile} posts={posts} />
}

export default ProfilePage
