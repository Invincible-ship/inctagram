import { resetCreatePostState } from '../../model/slice/createPostSlice'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import React, { FC, memo } from 'react'

type ButtonRole = 'discard' | 'save'

type CloseModalProps = {
  isOpen: boolean
  onClose: () => void
  closeCreatePostModal: () => void
}

const CloseModal: FC<CloseModalProps> = memo(({ isOpen, onClose, closeCreatePostModal }) => {
  const { t } = useClientTranslation(Namespaces.CREATE_POST)
  const dispatch = useAppDispatch()

  const handleClick = (role: ButtonRole) => () => {
    onClose()
    closeCreatePostModal()
    role == 'discard' && dispatch(resetCreatePostState())
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header close={onClose}>{t('close-modal.title')}</Modal.Header>
      <Modal.Body>
        <VStack align="start" justify="start" gap="24">
          <VStack>
            <p>{t('close-modal.paragraph-1')}</p>
            <p>{t('close-modal.paragraph-2')}</p>
          </VStack>
          <HStack justify="between" max>
            <Button theme={ButtonTheme.OUTLINED} onClick={handleClick('discard')}>
              {t('close-modal.discard-btn')}
            </Button>
            <Button theme={ButtonTheme.DEFAULT} onClick={handleClick('save')}>
              {t('close-modal.save-btn')}
            </Button>
          </HStack>
        </VStack>
      </Modal.Body>
    </Modal>
  )
})

CloseModal.displayName = 'CloseModal'

export default CloseModal
