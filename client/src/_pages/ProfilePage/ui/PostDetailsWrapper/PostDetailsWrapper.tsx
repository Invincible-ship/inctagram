import { useSelector } from 'react-redux'
import { getPosts } from '@/widgets/PostList'
import { useRouter, useSearchParams } from 'next/navigation'
import { POST_DETAILS_ID } from '@/widgets/PostList'
import { StateSchema } from '@/providers/StoreProvider'

export const PostDetailsWrapper = () => {
  const router = useRouter()
  const searchParams = new URLSearchParams(Array.from(useSearchParams()))
  const postId = searchParams.get(POST_DETAILS_ID) as string
  const post = useSelector((state: StateSchema) => getPosts.selectById(state, postId))

  const onClose = () => {
    searchParams.delete(POST_DETAILS_ID)
    router.push(`?${searchParams.toString()}`)
  }

  // TODO: add PostDetails component
  return post && <></>
}
