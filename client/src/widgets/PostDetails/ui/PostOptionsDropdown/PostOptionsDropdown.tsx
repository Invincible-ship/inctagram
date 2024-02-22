import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/Dropdown/Dropdown'
import { DottedMenuIcon } from '@/shared/ui/DottedMenuIcon/DottedMenuIcon'
import cls from './PostOptionsDropdown.module.scss'
import EditIcon from '@/shared/assets/icons/edit-2-outline.svg'
import DeleteIcon from '@/shared/assets/icons/trash-outline.svg'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { setEditMode } from '@/widgets/PostDetails/model/slice/postDetailsSlice'
import { HStack } from '@/shared/ui/Stack'

type PostOptionsDropdownProps = {
  openDeletePostModal: () => void
}
export const PostOptionsDropdown = ({ openDeletePostModal }: PostOptionsDropdownProps) => {
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const onClickDeletePost = () => {
    openDeletePostModal()
    setIsOpenMenu(false)
  }

  const onClickActivateEditMode = () => {
    dispatch(setEditMode(true))
  }

  return (
    <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
      <DropdownMenuTrigger>
        <DottedMenuIcon isActive={isOpenMenu} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cls.dropdownContent} sticky="always">
        <DropdownMenuItem role="button" onClick={onClickActivateEditMode}>
          <HStack gap="12" max>
            <EditIcon />
            <HStack>{t('dropDown.editPost')}</HStack>
          </HStack>
        </DropdownMenuItem>
        <DropdownMenuItem role="button" onClick={onClickDeletePost}>
          <HStack gap="12" max>
            <DeleteIcon />
            <HStack>{t('dropDown.deletePost')}</HStack>
          </HStack>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
