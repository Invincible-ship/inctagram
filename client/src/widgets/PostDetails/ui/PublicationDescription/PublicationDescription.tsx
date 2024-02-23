import cls from './PublicationDescription.module.scss'
import { AddComment } from '@/features/addCommentForm/ui/addCommentForm'
import { CommentList } from '@/entities/Comment/ui/CommentList/CommentList'
import { VStack } from '@/shared/ui/Stack'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { PostInfoBlock, getCurrentPost } from '@/entities/Post'
import { mockedComments } from '@/entities/Comment'
import { CommentCardOwner } from '@/entities/Comment/ui/CommentCard/CommentCardOwner'
import { PostDetailsFeatures } from '../PostDeatilsFeatures/PostDetailsFeatures'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import mockedAvatar from '../../../../../public/images/avatar-story.jpg'

type PublicationDescriptionProps = {
  t: TFunction<Namespaces, undefined>
}

const avatarUrls = Array.from({ length: 3 }, () => mockedAvatar.src)

export const PublicationDescription: FC<PublicationDescriptionProps> = memo(({ t }) => {
  const { description, avatarOwner, userName, ownerId, createdAt } = useSelector(getCurrentPost)

  return (
    <VStack max>
      <CommentList
        comments={mockedComments}
        ownerCard={
          <CommentCardOwner content={description} avatarUrl={avatarOwner} username={userName} />
        }
      />
      <VStack className={cls.featuresWithInfoBlock} gap="16" max>
        <PostDetailsFeatures postOwnerId={ownerId} />
        <PostInfoBlock avatarUrls={avatarUrls} createdAt={createdAt} t={t} likesCount={532} />
      </VStack>
      <AddComment />
    </VStack>
  )
})

PublicationDescription.displayName = 'PublicationDescription'
