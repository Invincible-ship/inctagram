import { FC, useMemo } from 'react'
import { IComment } from '../../model/types/types'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import cls from './CommentCard.module.scss'
import { useDateFormatter } from '@/shared/lib/hooks/useDateFormatter/useDateFormatter'
import { Namespaces } from '@/shared/config/i18n/types'
import { getFormattedPublciationDate } from '@/shared/utils/getFormattedPublciationDate'
import HeartIcon from '@/shared/assets/icons/heart-outline.svg'
import { TFunction } from 'i18next'

type CommentCardProps = {
  comment: IComment
  t: TFunction<Namespaces, undefined>
  commonT: TFunction<Namespaces, undefined>
}

export const CommentCard: FC<CommentCardProps> = ({ comment, t, commonT }) => {
  const formatter = useDateFormatter({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const avatarUrl = useMemo(() => {
    const avatar = comment.from.avatars.find(avatar => avatar.width == AvatarSize.SMALL)

    return avatar ? avatar.url : ''
  }, [comment])

  return (
    <HStack className={cls.CommentCard} gap="12" max>
      <HStack className={cls.avatarWrapper}>
        <Avatar src={avatarUrl} size={AvatarSize.SMALLEST} />
      </HStack>
      <VStack gap="8" max>
        <HStack align="center" justify="between" gap="12" max>
          <HStack className={cls.content}>
            <span className={cls.username}>{comment.from.username}</span>
            {comment.content}
          </HStack>
          <HStack className={cls.icon}>
            <HeartIcon viewBox="0 0 24 24" width="16" height="16" />
          </HStack>
        </HStack>
        <HStack className={cls.infoBlock} gap="12" max>
          <span>{getFormattedPublciationDate(comment.createdAt, formatter, commonT)}</span>
          <span>{t('card.likes', { count: 1 })}</span>
          <span className={cls.answer}>{t('card.answer')}</span>
        </HStack>
      </VStack>
    </HStack>
  )
}
