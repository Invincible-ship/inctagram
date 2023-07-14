"use client"
import React, { FC } from 'react'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { ModalWindow, ModalWindowPropsType } from '@/shared/ui/Modal/children/ui/ModalWindow'
import { useClientTranslation } from '@/shared/config/i18n/client'

type EmailConfirmationModalPropsType = Omit<ModalWindowPropsType, 'title' | 'text'>

const modalTitle = 'error.title'
const modalText = 'error.text'
const languageDatabase = 'signUpModal'

export const ErrorModal: FC<EmailConfirmationModalPropsType> = ({ lng, onClose, isOpen, userEmail }) => {

    const { t } = useClientTranslation(lng, languageDatabase)

    return <>
        <Modal onClose={onClose} isOpen={isOpen}  >
            <ModalWindow
                lng={lng}
                onClose={onClose}
                isOpen={isOpen}
                title={t(modalTitle)}
                text={t(modalText)}
                userEmail={userEmail}
            />
        </Modal>
    </>
}