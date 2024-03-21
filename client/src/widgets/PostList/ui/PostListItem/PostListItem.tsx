import { IPost } from '@/entities/Post'
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

type PostListItemProps = {
  className?: string
  post: IPost
  type: PostListCardType | undefined
}

const PREVIEW_IMAGE_WIDTH = 1440

export const PostListItem: FC<PostListItemProps> = ({ post, type, className }) => {
  const sp = useSearchParams()
  const imagePreview = post.images[0]
  const imageSizes = '(max-width: 768px) 50vw, 33vw'

  const getNewSearchParams = () => {
    const editableSP = new URLSearchParams(Array.from(sp))
    editableSP.set(POST_DETAILS_ID, String(post.id))
    return editableSP.toString()
  }

  const onClick = () => {
    history.pushState(null, '', `?${getNewSearchParams()}`)
  }

  if (type == PostListCardType.EXTENDED) {
    return <PostDetails postId={String(post.id)} variant={PostDetailsVariant.CARD} />
  }

  return (
    <HStack data-id={post.id} className={classNames(cls.PostListItem, {}, [className])}>
      <div role="link" className={cls.postLink} onClick={onClick}>
        <MyImage
          src={imagePreview?.url || ''}
          variant={ImageVariant.SQUARE}
          sizes={imageSizes}
          fallback={<Skeleton width="100%" height="100%" />}
          alt="Post Image"
        />
      </div>
      <HStack className={cls.postInfo} justify="center" align="center">
        <HStack gap="16">
          <HStack gap="4">
            <HeartIcon />
            238
          </HStack>
          <HStack gap="4">
            <CommentIcon />
            18
          </HStack>
        </HStack>
      </HStack>
    </HStack>
  )
}
