import Image from 'next/image'
import { PostOptionsDropdown } from './PostOptionsDropdown/PostOptionsDropdown'
import s from './PostHeader.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { useSelector } from 'react-redux'
import { StateSchema } from '@/providers/StoreProvider'

type Props = {
  avatar: string
  setIsOpenDeleteModal: (open: boolean) => void
  userName: string
  description: string
}
export const PostHeader = (props: Props) => {
  const { avatar, setIsOpenDeleteModal, userName, description } = props
  const editMode = useSelector((state: StateSchema) => state.postDetails.editMode)
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
          description={description}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
        />
      )}
    </header>
  )
}
