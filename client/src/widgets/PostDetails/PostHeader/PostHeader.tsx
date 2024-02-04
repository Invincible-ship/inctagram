import Image from 'next/image'
import { PostOptionsDropdown } from './PostOptionsDropdown/PostOptionsDropdown'
import s from '../PostDetails.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'

type Props = {
  editMode: boolean
  setEditMode: (mode: boolean) => void
  avatar: string
  setIsOpenDeleteModal: (open: boolean) => void
  userName: string
}
export const PostHeader = (props: Props) => {
  const { avatar, editMode, setEditMode, setIsOpenDeleteModal, userName } = props
  const mods = { [s.noBorder]: editMode }
  const headerClass = classNames(s.headerBlock, mods, [])
  return (
    <header className={headerClass}>
      <HStack justify="center" align="center">
        <Image className={s.imageAvatar} width={34} height={34} src={avatar} alt={'avatar'} />
        <span className={s.name}>{userName}</span>
      </HStack>
      {!editMode && (
        <PostOptionsDropdown
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          setEditMode={setEditMode}
        />
      )}
    </header>
  )
}
