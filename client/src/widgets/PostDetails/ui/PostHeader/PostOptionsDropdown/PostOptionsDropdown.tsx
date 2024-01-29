import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/Dropdown/Dropdown'
import { DottedMenuIcon } from '@/shared/ui/DottedMenuIcon/DottedMenuIcon'
import s from '@/widgets/PostDetails/ui/PostDetails.module.scss'
import EditIcon from '../../../../../shared/assets/icons/edit-2-outline.svg'
import DeleteIcon from '../../../../../shared/assets/icons/trash-outline.svg'

type Props = {
  setEditMode: (editMode: boolean) => void
}
export const PostOptionsDropdown = ({ setEditMode }: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const onClickDeletePost = () => {}
  const onClickEditPost = () => {
    setEditMode(true)
  }
  return (
    <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
      <DropdownMenuTrigger>
        <DottedMenuIcon isActive={isOpenMenu} />
      </DropdownMenuTrigger>
      <DropdownMenuContent sticky="always">
        <div className={s.MenuContent}>
          <button
            onClick={onClickEditPost}
            style={{ display: 'flex', gap: '10px', fontSize: '14px', alignItems: 'center' }}
          >
            <EditIcon />
            <span>Edit Post</span>
          </button>
          <button
            onClick={onClickDeletePost}
            style={{ display: 'flex', gap: '10px', fontSize: '14px', alignItems: 'center' }}
          >
            <DeleteIcon />
            <span>Delete Post</span>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
