import { PostListResponse } from '@/entities/Viewer'
import { GET_ALL_POSTS } from '@/shared/const/apiEndpoints'
import { PostSortField } from '@/shared/const/postSortField'
import HomePageClient from '@/_pages/HomePage/HomePage'

const fetchAllPostsData = async () => {
  'use server'
  const baseUrl = process.env.API
  const qp = new URLSearchParams({
    pageSize: '5',
    sortBy: PostSortField.CREATED,
    sortDirection: 'desc',
  })

  const response = await fetch(`${baseUrl}${GET_ALL_POSTS}?${qp.toString()}`, {
    next: {
      revalidate: 60,
    },
  })

  if (!response.ok) return undefined

  return (await response.json()) as PostListResponse
}

const HomePageServer = async () => {
  const postsData = await fetchAllPostsData()

  return <HomePageClient postsData={postsData} />
}

export default HomePageServer
