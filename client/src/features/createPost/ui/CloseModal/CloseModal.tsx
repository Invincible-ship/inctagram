import { Modal } from '@/shared/ui/Modal/Modal'
import React, { FC, memo } from 'react'

type CloseModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CloseModal: FC<CloseModalProps> = memo(({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      CloseModal
    </Modal>
  )
})

CloseModal.displayName = 'CloseModal'

export default CloseModal
