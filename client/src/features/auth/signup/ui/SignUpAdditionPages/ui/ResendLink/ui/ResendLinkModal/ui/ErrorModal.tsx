"use client"
import React, { FC } from 'react'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { ModalWindow, ModalWindowPropsType } from '@/shared/ui/Modal/children/ui/ModalWindow'
import { useClientTranslation } from '@/shared/config/i18n/client'

type EmailConfirmationModalPropsType = Omit<ModalWindowPropsType, 'title' | 'text'> & { lng: string }

const languageDatabase = 'signUpModal'
const modalTitle = 'error.title'
const modalText = 'error.text'
const emptyEmail = 'error.emptyEmail'

export const ErrorModal: FC<EmailConfirmationModalPropsType> = ({ lng, onClose, isOpen, userEmail }) => {

  const { t } = useClientTranslation(lng, languageDatabase)

  if (userEmail) {
    return <>
      <Modal onClose={onClose} isOpen={isOpen}  >
        <ModalWindow
          onClose={onClose}
          isOpen={isOpen}
          title={t(modalTitle)}
          text={t(modalText)}
          userEmail={userEmail}
        />
      </Modal>
    </>
  }
  else {
    return <>
      <Modal onClose={onClose} isOpen={isOpen}  >
        <ModalWindow
          onClose={onClose}
          isOpen={isOpen}
          title={t(modalTitle)}
          text={t(emptyEmail)}
        />
      </Modal>
    </>
  }
}
