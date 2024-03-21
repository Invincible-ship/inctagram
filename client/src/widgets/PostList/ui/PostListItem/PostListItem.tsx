import { IPost, PostCardExtended } from '@/entities/Post'
import { ImageVariant, MyImage } from '@/shared/ui/MyImage/MyImage'
import { PostListCardType } from '../../model/consts/postListCardType'
import React, { FC } from 'react'
import { HStack } from '@/shared/ui/Stack'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useSearchParams } from 'next/navigation'
import { POST_DETAILS_ID } from '../../model/consts/postDetailsId'
import cls from './PostListItem.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import HeartIcon from '@/shared/assets/icons/heart-outline.svg'
import CommentIcon from '@/shared/assets/icons/message-circle-outline.svg'
import { PostDetails } from '@/widgets/PostDetails'
import { PostDetailsVariant } from '@/widgets/PostDetails/model/consts/variant'
import { PostCardImage } from '@/entities/Post/ui/PostCardImage/PostCardImage'

type PostListItemProps = {
  className?: string
  post: IPost
  type: PostListCardType | undefined
}

export const PostListItem: FC<PostListItemProps> = ({ post, type, className }) => {
  const sp = useSearchParams()

  const getNewSearchParams = () => {
    const editableSP = new URLSearchParams(Array.from(sp))
    editableSP.set(POST_DETAILS_ID, String(post.id))
    return editableSP.toString()
  }

  const onClick = () => {
    history.pushState(null, '', `?${getNewSearchParams()}`)
  }

  switch (type) {
    case PostListCardType.POST_DETAILS:
      return <PostDetails postId={String(post.id)} variant={PostDetailsVariant.CARD} />
    case PostListCardType.EXTENDED:
      return <PostCardExtended className={cls.PostListItem} post={post} onClick={onClick} />
    case PostListCardType.IMAGE:
      return (
        <PostCardImage
          postId={post.id}
          image={post.images[0]}
          onClick={onClick}
          className={classNames(cls.PostListItem, {}, [className])}
          additionalInfoClassName={cls.postInfo}
        />
      )
  }
}
