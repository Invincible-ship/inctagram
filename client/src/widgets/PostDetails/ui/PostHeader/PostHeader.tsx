import { PostOptionsDropdown } from '../PostOptionsDropdown/PostOptionsDropdown'
import cls from './PostHeader.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useSelector } from 'react-redux'
import { AvatarWithUsername } from '@/entities/Profile/ui/AvatarWithUsername'
import { memo, useMemo } from 'react'
import { getCurrentPost } from '@/entities/Post'
import { getEditMode } from '../../model/selectors/getEditMode'

type PostHeaderProps = {
  openDeletePostModal: () => void
}

export const PostHeader = memo(({ openDeletePostModal }: PostHeaderProps) => {
  const { avatarOwner, userName, ownerId } = useSelector(getCurrentPost)
  const editMode = useSelector(getEditMode)

  const user = useMemo(
    () => ({
      id: ownerId,
      avatarUrl: avatarOwner,
      userName,
    }),
    [ownerId, avatarOwner, userName],
  )

  const mods = { [cls.noBorder]: editMode }

  return (
    <header className={classNames(cls.headerBlock, mods, [])}>
      <AvatarWithUsername user={user} className={cls.userName} />
      {!editMode && <PostOptionsDropdown openDeletePostModal={openDeletePostModal} />}
    </header>
  )
})

PostHeader.displayName = 'PostHeader'
