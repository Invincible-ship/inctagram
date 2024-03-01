import { useSelector } from 'react-redux'
import { getPosts } from '@/widgets/PostList'
import { useRouter, useSearchParams } from 'next/navigation'
import { POST_DETAILS_ID } from '@/widgets/PostList'
import { StateSchema } from '@/app/providers/StoreProvider'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { IPost, setCurrentPost } from '@/entities/Post'
import { lazy, useEffect } from 'react'
const PostDetails = lazy(() =>
  import('@/widgets/PostDetails').then(mod => ({ default: mod.PostDetails })),
)

export const PostDetailsWrapper = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const searchParams = new URLSearchParams(Array.from(useSearchParams()))
  const postId = searchParams.get(POST_DETAILS_ID) as string
  const post = useSelector((state: StateSchema) => getPosts.selectById(state, postId))

  const onClose = () => {
    searchParams.delete(POST_DETAILS_ID)
    router.push(`?${searchParams.toString()}`)
  }

  useEffect(() => {
    if (!post) {
      dispatch(setCurrentPost({} as IPost))
      return
    }

    dispatch(setCurrentPost(post))
  }, [post, dispatch])

  // TODO: add PostDetails component
  return post && <PostDetails isOpen={!!post.id} postId={postId} onClose={onClose} />
}
