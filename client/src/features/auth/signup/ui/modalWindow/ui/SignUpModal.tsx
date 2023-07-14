"use client"
import React, { FC } from 'react'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { ModalWindow, ModalWindowPropsType } from '@/shared/ui/Modal/children/ui/ModalWindow'
import { useClientTranslation } from '@/shared/config/i18n/client'

const modalTitle = 'signUpModal.title'
const modalText = 'signUpModal.text'
const languageDatabase = 'signUpModal'

export const SignUpModal: FC<EmailConfirmationModalPropsType> = ({ lng, onClose, isOpen, userEmail }) => {

    const { t } = useClientTranslation(lng, languageDatabase)

    return <>
        <Modal onClose={onClose} isOpen={isOpen}  >
            <ModalWindow
                lng={lng}
                title={t(modalTitle)}
                text={t(modalText)}
                onClose={onClose}
                isOpen={isOpen}
                userEmail={userEmail}
            />
        </Modal>
    </>
}

//========================================================================================================================================================
//types
type EmailConfirmationModalPropsType = Omit<ModalWindowPropsType, 'title' | 'text'>