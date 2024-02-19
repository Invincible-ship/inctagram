import { IPost } from '@/entities/Post'
import { ImageVariant, MyImage } from '@/shared/ui/MyImage/MyImage'
import { PostListCardType } from '../../model/consts/postListCardType'
import React, { FC, useMemo } from 'react'
import { HStack } from '@/shared/ui/Stack'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { POST_DETAILS_ID } from '../../model/consts/postDetailsId'
import cls from './PostListItem.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import HeartIcon from '@/shared/assets/icons/heart-outline.svg'
import CommentIcon from '@/shared/assets/icons/message-circle-outline.svg'

type PostListItemProps = {
  className?: string
  post: IPost
  type: PostListCardType
}

const PREVIEW_IMAGE_WIDTH = 640

export const PostListItem: FC<PostListItemProps> = ({ post, type, className }) => {
  const searchParams = new URLSearchParams(Array.from(useSearchParams()))
  const imagePreview = useMemo(() => {
    return post.images.find(image => image.width == PREVIEW_IMAGE_WIDTH)
  }, [post])

  if (!imagePreview) return <Skeleton width="100%" height="100%" />

  const imageTypeSizes = '(max-width: 768px) 50vw, 33vw'

  searchParams.set(POST_DETAILS_ID, String(post.id))

  if (type == PostListCardType.EXTENDED) {
    // TODO: implement UI for extended card type
    return <>Extended Card</>
  }

  return (
    <HStack data-id={post.id} className={classNames(cls.PostListItem, {}, [className])}>
      <Link href={`?${searchParams.toString()}`} className={cls.postLink}>
        <MyImage
          src={imagePreview.url}
          variant={ImageVariant.SQUARE}
          sizes={imageTypeSizes}
          fallback={<Skeleton width="100%" height="100%" />}
          alt="Post Image"
        />
      </Link>
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
