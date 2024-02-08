import { PostListResponse } from '@/entities/Viewer'
import { GET_ALL_POSTS } from '@/shared/const/apiEndpoints'
import { PostSortField } from '@/shared/const/postSortField'
import HomePage from '@/_pages/HomePage/HomePage'

const baseUrl = process.env.NEXT_PUBLIC_API

const qp = new URLSearchParams({
  pageSize: '5',
  sortBy: PostSortField.CREATED,
  sortDirection: 'desc',
})

const ServerHomePage = async () => {
  const response = await fetch(`${baseUrl}${GET_ALL_POSTS}?${qp.toString()}`, {
    next: {
      revalidate: 60,
    },
  })
  const postsData: PostListResponse = await response.json()

  return <HomePage postsData={postsData} />
}

export default ServerHomePage
