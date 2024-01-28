import { Namespaces } from '@/shared/config/i18n/types'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { HStack, VStack } from '@/shared/ui/Stack'
import { TFunction } from 'i18next'
import cls from './UploadAvatar.module.scss'
import { FC, useRef, useState } from 'react'
import { UploadAvatarModal } from './UploadAvatarModal'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { ProfileAvatars } from '@/entities/Profile'
import DeleteAvatarIcon from '@/shared/assets/icons/delete-avatar.svg'
import { DeleteAvatarModal } from './DeleteAvatarModal'

type UploadAvatarProps = {
  t: TFunction<Namespaces, undefined>
}

export const UploadAvatar: FC<UploadAvatarProps> = ({ t }) => {
  const [isUploadAvatarModalOpen, setIsUploadAvatarModalOpen] = useState<boolean>(false)
  const [isDeleteAvatarModalOpen, setIsDeleteAvatarModalOpen] = useState<boolean>(false)
  const [uploaded, setUploaded] = useState(undefined as string | undefined)
  const toastSizeErrorIdRef = useRef<string>()
  const avatar = useSelector(ProfileAvatars.getLarge)

  const handleUploadButtonClick = () => setIsUploadAvatarModalOpen(true)
  const handleDeleteButtonClick = () => setIsDeleteAvatarModalOpen(true)

  const closeUploadAvatarModal = () => {
    toast.remove(toastSizeErrorIdRef.current)
    setUploaded(undefined)
    setIsUploadAvatarModalOpen(false)
  }
  const closeDeleteAvatarModal = () => {
    setIsDeleteAvatarModalOpen(false)
  }

  return (
    <>
      <VStack gap="24" className={cls.avatarField}>
        <HStack align="center" justify="center" max>
          <div className={cls.avatarWrapper}>
            <Avatar src={avatar?.url} size={AvatarSize.LARGE} />
            {avatar && (
              <span className={cls.deleteBtn} onClick={handleDeleteButtonClick} role="button">
                <DeleteAvatarIcon />
              </span>
            )}
          </div>
        </HStack>
        <Button
          className={cls.btn}
          onClick={handleUploadButtonClick}
          theme={ButtonTheme.OUTLINED}
          full
        >
          {t('general-info.avatar-btn')}
        </Button>
      </VStack>
      <UploadAvatarModal
        uploaded={uploaded}
        setUploaded={setUploaded}
        toastSizeErrorIdRef={toastSizeErrorIdRef}
        isOpen={isUploadAvatarModalOpen}
        onClose={closeUploadAvatarModal}
        t={t}
      />
      <DeleteAvatarModal isOpen={isDeleteAvatarModalOpen} onClose={closeDeleteAvatarModal} t={t} />
    </>
  )
}
