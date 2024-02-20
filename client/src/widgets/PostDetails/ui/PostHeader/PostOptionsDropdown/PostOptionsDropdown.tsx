import { ReactNode, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/Dropdown/Dropdown'
import { DottedMenuIcon } from '@/shared/ui/DottedMenuIcon/DottedMenuIcon'
import s from './PostOptionsDropdown.module.scss'
import EditIcon from '@/shared/assets/icons/edit-2-outline.svg'
import DeleteIcon from '@/shared/assets/icons/trash-outline.svg'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { setEditMode, setTextValue } from '@/widgets/PostDetails/model/slice/postDetailsSlice'

type Props = {
  description: string
  setIsOpenDeleteModal: (open: boolean) => void
}
export const PostOptionsDropdown = ({ setIsOpenDeleteModal, description }: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const onClickDeletePost = () => {
    setIsOpenDeleteModal(true)
    setIsOpenMenu(false)
  }
  const onClickActivateEditMode = () => {
    dispatch(setEditMode(true))
    dispatch(setTextValue(description))
  }
  return (
    <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
      <DropdownMenuTrigger>
        <DottedMenuIcon isActive={isOpenMenu} />
      </DropdownMenuTrigger>
      <DropdownMenuContent sticky="always">
        <div className={s.MenuContent}>
          <ButtonItem onClick={onClickActivateEditMode} text={t('dropDown.editPost')}>
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
