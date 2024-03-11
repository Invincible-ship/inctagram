import { getUserId } from '@/entities/User'
import { ForwardPost } from '@/features/post/forwardPost'
import { LikePost } from '@/features/post/likePost'
import { BookmarkPost } from '@/features/post/addPostToBookmark'
import { HStack } from '@/shared/ui/Stack'
import Link from 'next/link'
import { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import MessageIcon from '@/shared/assets/icons/message-circle-outline.svg'
import cls from './PostDetailsFeatures.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { IPost } from '@/entities/Post'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import { removePost } from '@/widgets/PostList/model/slice/postListSlice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useRouter, useSearchParams } from 'next/navigation'
import { POST_DETAILS_ID } from '@/widgets/PostList'
import { getUpdatedPostList } from '../../model/selectors/getUpdatedPostList'

type PostDetailsFeaturesProps = {
  className?: string
  post: IPost
  postOwnerId: number
  t: TFunction<Namespaces, undefined>
}

export const PostDetailsFeatures: FC<PostDetailsFeaturesProps> = ({
  postOwnerId,
  className,
  post,
  t,
}) => {
  const router = useRouter()
  const sp = useSearchParams()
  const userId = useSelector(getUserId)
  const updatedPostList = useSelector(getUpdatedPostList)
  const owner = userId == postOwnerId
  const dispatch = useAppDispatch()

  const updatePostList = useCallback(
    (id: number) => {
      if (updatedPostList) {
        const editableSP = new URLSearchParams(Array.from(sp))
        editableSP.delete(POST_DETAILS_ID)
        router.push(`?${editableSP.toString()}`)

        dispatch(removePost(id))
      }
    },
    [updatedPostList, dispatch, router, sp],
  )

  return (
    <HStack className={classNames(cls.PostDetailsFeatures, {}, [className])} justify="between" max>
      <HStack gap="24">
        <LikePost />
        {!owner && (
          <Link href="#">
            <MessageIcon />
          </Link>
        )}
        <ForwardPost />
      </HStack>
      <HStack>
        <BookmarkPost post={post} t={t} onClick={updatePostList} />
      </HStack>
    </HStack>
  )
}
