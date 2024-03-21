import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import React, { FC } from 'react'
import cls from './PostCardImage.module.scss'
import { ImageVariant, MyImage } from '@/shared/ui/MyImage/MyImage'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { PostAdditionalInfo } from '@/entities/Post/ui/PostAdditionalInfo/PostAdditionalInfo'
import { PostImage } from '@/entities/Post'

type PostCardImageProps = {
  postId: number
  className?: string
  additionalInfoClassName?: string
  onClick?: () => void
  image: PostImage
}

export const PostCardImage: FC<PostCardImageProps> = ({
  postId,
  image,
  onClick,
  className,
  additionalInfoClassName,
}) => {
  const imageSizes = '(max-width: 768px) 50vw, 33vw'

  return (
    <HStack data-id={postId} className={className}>
      <HStack role="link" className={cls.postLink} onClick={onClick}>
        <MyImage
          src={image?.url || ''}
          variant={ImageVariant.SQUARE}
          sizes={imageSizes}
          fallback={<Skeleton width="100%" height="100%" />}
          alt="Post Image"
        />
      </HStack>
      <PostAdditionalInfo className={additionalInfoClassName} />
    </HStack>
  )
}
