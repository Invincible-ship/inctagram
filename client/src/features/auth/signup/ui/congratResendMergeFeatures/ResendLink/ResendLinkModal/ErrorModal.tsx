'use client'
import React, { FC } from 'react'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { ModalWindow } from '@/shared/ui/Modal/children/ModalWindow'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { ModalPropsType } from '@/features/auth/signup/model/types/types'

const languageDatabase = 'signUpModal'
const modalTitle = 'error.title'
const modalText = 'error.text'
const emptyEmail = 'error.emptyEmail'

export const ErrorModal: FC<ModalPropsType> = ({ lng, onClose, isOpen, userEmail }) => {
  const { t } = useClientTranslation('', languageDatabase)

  if (userEmail) {
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
  } else {
    return (
      <>
        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalWindow
            onClose={onClose}
            isOpen={isOpen}
            title={t(modalTitle)}
            text={t(emptyEmail)}
          />
        </Modal>
      </>
    )
  }
}
