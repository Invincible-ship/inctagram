import { useRouter, useSearchParams } from 'next/navigation'
import { POST_DETAILS_ID } from '@/widgets/PostList'
import { lazy, useCallback } from 'react'
const PostDetails = lazy(() =>
  import('@/widgets/PostDetails').then(mod => ({ default: mod.PostDetails })),
)

export const PostDetailsWrapper = () => {
  const router = useRouter()
  const sp = useSearchParams()
  const postId = sp.get(POST_DETAILS_ID) as string

  const onClose = useCallback(() => {
    const editableSP = new URLSearchParams(Array.from(sp))
    editableSP.delete(POST_DETAILS_ID)
    router.push(`?${editableSP.toString()}`)
  }, [sp, router])

  // TODO: add PostDetails component
  return postId && <PostDetails isOpen={!!postId} postId={postId} onClose={onClose} />
}
