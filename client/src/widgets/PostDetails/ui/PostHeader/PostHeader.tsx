import { PostOptionsDropdown } from '../PostOptionsDropdown/PostOptionsDropdown'
import cls from './PostHeader.module.scss'
import { useSelector } from 'react-redux'
import { AvatarWithUsername } from '@/entities/Profile/ui/AvatarWithUsername'
import { memo, useMemo } from 'react'
import { getEditMode } from '../../model/selectors/getEditMode'
import { HStack } from '@/shared/ui/Stack'
import { getFormattedPublciationDate } from '@/shared/utils/getFormattedPublciationDate'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { useDateFormatter } from '@/shared/lib/hooks/useDateFormatter/useDateFormatter'
import { PostDetailsVariant } from '../../model/consts/variant'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getCurrentPost } from '../../model/selectors/getCurrentPost'
import { getUserId } from '@/entities/User'

type PostHeaderProps = {
  postId: string
  variant?: PostDetailsVariant
  openDeletePostModal?: () => void
}

export const PostHeader = memo(
  ({ openDeletePostModal, variant = PostDetailsVariant.MODAL, postId }: PostHeaderProps) => {
    const { t: commonT } = useClientTranslation()
    const formatter = useDateFormatter({
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    const { avatarOwner, userName, ownerId, createdAt } = useSelector(getCurrentPost(postId))
    const editMode = useSelector(getEditMode)
    const isModal = variant == PostDetailsVariant.MODAL

    const user = useMemo(
      () => ({
        id: ownerId,
        avatarUrl: avatarOwner,
        userName,
      }),
      [ownerId, avatarOwner, userName],
    )

    const mods = {
      [cls.modal]: isModal,
    }

    return (
      <HStack className={classNames(cls.header, mods)} align="center" justify="between" max>
        <HStack gap="8" align="center">
          <AvatarWithUsername user={user} />
          {!isModal && (
            <HStack className={cls.postDate} align="center" gap="8">
              <span className={cls.dot}></span>
              <HStack className={cls.date}>
                {getFormattedPublciationDate(createdAt, formatter, commonT)}
              </HStack>
            </HStack>
          )}
        </HStack>
        {!editMode && (
          <PostOptionsDropdown
            postId={postId}
            ownerId={ownerId}
            isModal={isModal}
            openDeletePostModal={openDeletePostModal}
          />
        )}
      </HStack>
    )
  },
)

PostHeader.displayName = 'PostHeader'
