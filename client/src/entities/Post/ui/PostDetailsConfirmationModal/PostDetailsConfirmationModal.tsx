import { Modal, ModalBody, ModalHeader } from '@/shared/ui/Modal/Modal'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import cls from './PostDetailsConfirmationModal.module.scss'
import { HStack, VStack } from '@/shared/ui/Stack'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import { FC, memo } from 'react'

type PostDetailsConfirmationModalProps = {
  onClick: () => void
  title: string
  text: string
  handleClose: () => void
  isOpen: boolean
  isLoading?: boolean
  t: TFunction<Namespaces, undefined>
}
export const PostDetailsConfirmationModal: FC<PostDetailsConfirmationModalProps> = memo(props => {
  const { isLoading, isOpen, text, title, handleClose, onClick, t } = props

  return (
    <Modal onClose={handleClose} isOpen={isOpen}>
      <ModalHeader close={handleClose}>{title}</ModalHeader>
      <ModalBody>
        <VStack gap="24" max>
          <HStack className={cls.text}>{text}</HStack>
          <HStack className={cls.btns} justify="end" align="center" gap="24" max>
            <Button isLoading={isLoading} theme={ButtonTheme.OUTLINED} onClick={onClick}>
              {t('modal.yes')}
            </Button>
            <Button theme={ButtonTheme.DEFAULT} onClick={handleClose}>
              {t('modal.no')}
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </Modal>
  )
})

PostDetailsConfirmationModal.displayName = 'PostDetailsConfirmationModal'
