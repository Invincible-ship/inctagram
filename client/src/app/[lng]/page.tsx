import { PostListResponse, TotalUsersCounter } from '@/entities/Viewer'
import { GET_ALL_POSTS } from '@/shared/const/apiEndpoints'
import { PostSortField } from '@/shared/const/postSortField'
import HomePageClient from '@/_pages/HomePage/HomePage'
import { POST_TAG } from '@/shared/const/rtk'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { FC } from 'react'
import { useServerTranslation } from '@/shared/config/i18n/server'

const fetchAllPostsData = async () => {
  'use server'
  const baseUrl = process.env.API
  const qp = new URLSearchParams({
    pageSize: '4',
    sortBy: PostSortField.CREATED,
    sortDirection: 'desc',
  })

  const response = await fetch(`${baseUrl}${GET_ALL_POSTS}?${qp.toString()}`, {
    next: {
      tags: [POST_TAG],
      revalidate: 60,
    },
  })

  if (!response.ok) return undefined

  return (await response.json()) as PostListResponse
}

type HomePageServerParams = {
  lng: LanguageIds
}

type HomePageServerProps = {
  params: HomePageServerParams
}

const HomePageServer: FC<HomePageServerProps> = async ({ params }) => {
  const { lng } = params
  const postsData = await fetchAllPostsData()
  const { t } = await useServerTranslation(lng, Namespaces.HOME_PAGE)

  return (
    <HomePageClient postsData={postsData}>
      <TotalUsersCounter t={t} />
    </HomePageClient>
  )
}

export default HomePageServer
