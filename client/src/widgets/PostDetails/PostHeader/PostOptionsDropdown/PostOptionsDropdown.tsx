import { ReactNode, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/Dropdown/Dropdown'
import { DottedMenuIcon } from '@/shared/ui/DottedMenuIcon/DottedMenuIcon'
import s from '../../PostDetails.module.scss'
import EditIcon from '@/shared/assets/icons/edit-2-outline.svg'
import DeleteIcon from '@/shared/assets/icons/trash-outline.svg'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'

type Props = {
  setEditMode: (editMode: boolean) => void
  setIsOpenDeleteModal: (open: boolean) => void
}
export const PostOptionsDropdown = ({ setEditMode, setIsOpenDeleteModal }: Props) => {
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const onClickDeletePost = () => {
    setIsOpenDeleteModal(true)
    setIsOpenMenu(false)
  }
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
          <ButtonItem onClick={onClickEditPost} text={t('dropDown.editPost')}>
            <EditIcon />
          </ButtonItem>
          <ButtonItem onClick={onClickDeletePost} text={t('dropDown.deletePost')}>
            <DeleteIcon />
          </ButtonItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type PropsItem = {
  onClick: () => void
  text: string
  children?: ReactNode
}
const ButtonItem = ({ onClick, text, children }: PropsItem) => {
  return (
    <button onClick={onClick} className={s.buttonItem}>
      {children}
      <span>{text}</span>
    </button>
  )
}
