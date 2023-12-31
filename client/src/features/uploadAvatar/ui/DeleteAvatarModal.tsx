import { Namespaces } from '@/shared/config/i18n/types'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Modal } from '@/shared/ui/Modal/Modal'
import { TFunction } from 'i18next'
import { FC } from 'react'
import cls from './DeleteAvatarModal.module.scss'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { setProfileAvatars, useDeleteProfileAvatarsMutation } from '@/entities/Profile'
import { LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'

type DeleteAvatarModalProps = {
  isOpen: boolean
  onClose: () => void
  t: TFunction<Namespaces, undefined>
}

export const DeleteAvatarModal: FC<DeleteAvatarModalProps> = ({ isOpen, onClose, t }) => {
  const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY) as string
  const dispatch = useAppDispatch()
  const [deleteAvatarsMutation, { isLoading }] = useDeleteProfileAvatarsMutation()

  const deleteAvatars = async () => {
    try {
      await deleteAvatarsMutation(userId).unwrap()

      dispatch(setProfileAvatars([]))
      onClose()
    } catch (err) {
      console.log('Delete avatar error: ', err)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={438}>
      <Modal.Header close={onClose}>{t('general-info.delete-modal.title')}</Modal.Header>
      <Modal.Body>
        <VStack gap="36" align="stretch">
          <p className={cls.text}>{t('general-info.delete-modal.text')}</p>
          <HStack gap="24" justify="end" max>
            <Button
              className={cls.btn}
              theme={ButtonTheme.OUTLINED}
              onClick={deleteAvatars}
              disabled={isLoading}
              isLoading={isLoading}
            >
              {t('general-info.delete-modal.btns.yes')}
            </Button>
            <Button className={cls.btn} theme={ButtonTheme.DEFAULT} onClick={onClose}>
              {t('general-info.delete-modal.btns.no')}
            </Button>
          </HStack>
        </VStack>
      </Modal.Body>
    </Modal>
  )
}
