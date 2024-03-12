import { FC } from 'react'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import cls from './CommentCard.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

type CommentCardOwnerProps = {
  avatarUrl: string
  username: string
  content: string
}

export const CommentCardOwner: FC<CommentCardOwnerProps> = ({ avatarUrl, username, content }) => {
  return (
    <HStack className={classNames(cls.CommentCard, {}, [cls.owner])} gap="12" max>
      <HStack className={cls.avatarWrapper}>
        <Avatar src={avatarUrl} size={AvatarSize.SMALLEST} />
      </HStack>
      <VStack gap="8" max>
        <HStack className={cls.content}>
          <span className={cls.username}>{username}</span>
          <span className={cls.text}>{content}</span>
        </HStack>
      </VStack>
    </HStack>
  )
}
