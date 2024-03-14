// import { useRouter, useSearchParams } from 'next/navigation'
// import { POST_DETAILS_ID } from '@/widgets/PostList'
// import { PostDetails } from '@/widgets/PostDetails'
// import { lazy, useCallback } from 'react'
// import dynamic from 'next/dynamic'
// import { PostDetailsModalSkeleton } from '@/widgets/PostDetails/ui/PostDetailsModal/PostDetailsModal'
// // const PostDetails = dynamic(() => import('@/widgets/PostDetails').then(mod => mod.PostDetails), {
// //   loading: () => <PostDetailsModalSkeleton />,
// // })

// export const PostDetailsWrapper = () => {
//   const router = useRouter()
//   const sp = useSearchParams()
//   const postId = sp.get(POST_DETAILS_ID) as string

//   const onClose = useCallback(() => {
//     const editableSP = new URLSearchParams(Array.from(sp))
//     editableSP.delete(POST_DETAILS_ID)
//     router.push(`?${editableSP.toString()}`)
//   }, [sp, router])

//   // TODO: add PostDetails component
//   return postId && <PostDetails isOpen={!!postId} postId={postId} onClose={onClose} />
// }
