import { getUserId } from '@/entities/User'
import { ForwardPost } from '@/features/post/forwardPost'
import { LikePost } from '@/features/post/likePost'
import { BookmarkPost } from '@/features/post/addPostToBookmark'
import { HStack } from '@/shared/ui/Stack'
import Link from 'next/link'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import MessageIcon from '@/shared/assets/icons/message-circle-outline.svg'
import cls from './PostDetailsFeatures.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

type PostDetailsFeaturesProps = {
  className?: string
  postOwnerId: number
}

export const PostDetailsFeatures: FC<PostDetailsFeaturesProps> = ({ postOwnerId, className }) => {
  const userId = useSelector(getUserId)
  const owner = userId == postOwnerId

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
        <BookmarkPost />
      </HStack>
    </HStack>
  )
}
