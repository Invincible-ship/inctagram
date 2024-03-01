import { useContext, useState } from 'react'
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
import FollowIcon from '@/shared/assets/icons/person-add-outline.svg'
import CopyIcon from '@/shared/assets/icons/copy-outline.svg'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'
import { useSelector } from 'react-redux'
import { getUserId } from '@/entities/User'
import { Routes } from '@/shared/types/routes'

type PostOptionsDropdownProps = {
  postId: string
  ownerId: number
  isModal?: boolean
  openDeletePostModal?: () => void
}
export const PostOptionsDropdown = ({
  postId,
  openDeletePostModal,
  ownerId,
}: PostOptionsDropdownProps) => {
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)
  const lngId = useContext(LanguageContext)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const userId = useSelector(getUserId)
  const dispatch = useAppDispatch()
  const owner = userId === ownerId

  const onClickDeletePost = () => {
    openDeletePostModal?.()
    setIsOpenMenu(false)
  }

  const onClickActivateEditMode = () => {
    dispatch(setEditMode(true))
  }

  const copyLink = () => {
    const base = process.env.NEXT_PUBLIC_PRODUCTION_CLIENT_URL as string
    const sp = new URLSearchParams({
      postDetailsId: postId,
    })

    const url = `${base}/${lngId}${Routes.PROFILE}/${ownerId}?${sp.toString()}`

    navigator.clipboard.writeText(url)
  }

  const ownerContent = (
    <>
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
    </>
  )

  const userContent = (
    <>
      <DropdownMenuItem role="button">
        <HStack gap="12" max>
          <FollowIcon />
          <HStack>{t('dropDown.follow')}</HStack>
        </HStack>
      </DropdownMenuItem>
      <DropdownMenuItem role="button" onClick={copyLink}>
        <HStack gap="12" max>
          <CopyIcon />
          <HStack>{t('dropDown.copy')}</HStack>
        </HStack>
      </DropdownMenuItem>
    </>
  )

  if (!userId) return null

  return (
    <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
      <DropdownMenuTrigger>
        <DottedMenuIcon isActive={isOpenMenu} className={cls.trigger} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cls.dropdownContent} sticky="always">
        {owner ? ownerContent : userContent}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
