import cls from './PublicationDescription.module.scss'
import { AddComment } from '@/features/addCommentForm/ui/addCommentForm'
import { CommentList } from '@/entities/Comment/ui/CommentList/CommentList'
import { VStack } from '@/shared/ui/Stack'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { PostInfoBlock } from '@/entities/Post'
import { mockedComments } from '@/entities/Comment'
import { CommentCardOwner } from '@/entities/Comment/ui/CommentCard/CommentCardOwner'
import { PostDetailsFeatures } from '../PostDeatilsFeatures/PostDetailsFeatures'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import mockedAvatar from '../../../../../public/images/avatar-story.jpg'
import { PostDetailsVariant } from '../../model/consts/variant'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getCurrentPost } from '../../model/selectors/getCurrentPost'
import { getUserId } from '@/entities/User'

type PublicationDescriptionProps = {
  postId: string
  variant?: PostDetailsVariant
  t: TFunction<Namespaces, undefined>
}

const avatarUrls = Array.from({ length: 3 }, () => mockedAvatar.src)

export const PublicationDescription: FC<PublicationDescriptionProps> = memo(
  ({ t, variant = PostDetailsVariant.MODAL, postId }) => {
    const isAuthorized = useSelector(getUserId)
    const { description, avatarOwner, userName, ownerId, createdAt } = useSelector(
      getCurrentPost(postId),
    )
    const isModal = variant == PostDetailsVariant.MODAL
    const gap = !isModal ? '16' : undefined

    const mainMods = {
      [cls.additionalPadding]: !isAuthorized,
    }

    const commentListMods = {
      [cls.fullHeight]: !isAuthorized,
    }

    return (
      <VStack
        className={classNames(cls.PublicationDescription, mainMods, [cls[variant]])}
        gap={gap}
        max
      >
        {isAuthorized && <PostDetailsFeatures className={cls.features} postOwnerId={ownerId} />}
        {!isModal && description.length > 0 && (
          <CommentCardOwner content={description} avatarUrl={avatarOwner} username={userName} />
        )}
        <PostInfoBlock
          className={cls.info}
          avatarUrls={avatarUrls}
          createdAt={isModal ? createdAt : undefined}
          t={t}
          likesCount={532}
        />
        <CommentList
          className={classNames(cls.commentList, commentListMods)}
          comments={mockedComments}
          ownerCard={
            isModal && (
              <CommentCardOwner content={description} avatarUrl={avatarOwner} username={userName} />
            )
          }
          all={!isModal}
        />
        {isAuthorized && <AddComment className={cls.addComment} />}
      </VStack>
    )
  },
)

PublicationDescription.displayName = 'PublicationDescription'
