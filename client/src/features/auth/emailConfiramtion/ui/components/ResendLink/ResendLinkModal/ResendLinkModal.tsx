'use client'
import React, { FC } from 'react'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { ModalWindow } from '@/features/auth/emailConfiramtion/ui/ModalWindow/ModalWindow'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { ModalPropsType } from '@/features/auth/signup/model/types/types'

const modalTitle = 'signUpModal.title'
const modalText = 'signUpModal.text'
const languageDatabase = 'signUpModal'

export const ResendLinkModal: FC<ModalPropsType> = ({ lng, onClose, isOpen, userEmail }) => {
  const { t } = useClientTranslation('', languageDatabase)

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalWindow
          onClose={onClose}
          isOpen={isOpen}
          title={t(modalTitle)}
          text={t(modalText)}
          userEmail={userEmail}
        />
      </Modal>
    </>
  )
}
