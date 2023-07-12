"use client"
import React, { FC, useState } from 'react'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { ModalWindow, ModalWindowProps } from '@/shared/ui/Modal/children/ui/ModalWindow'
import { useClientTranslation } from '@/shared/config/i18n/client'

type EmailConfirmationModalPropsType = Omit<ModalWindowProps, 'title' | 'text'>

export const EmailConfirmationModal: FC<EmailConfirmationModalPropsType> = ({ lng, onClose, isOpen }) => {
    const modalTitle = 'EmailConfirmationModal.title'
    const modalText = 'EmailConfirmationModal.text'
    const languageDatabase = 'signUpModal'

    const { t } = useClientTranslation(lng, languageDatabase)

    const [title, setTitle] = useState(t(modalTitle))
    const [text, setText] = useState(t(modalText))


    return <>
        <Modal onClose={onClose} isOpen={isOpen}  >
            <ModalWindow
                lng={lng}
                onClose={onClose}
                isOpen={isOpen}
                title={title}
                text={text}
            />
        </Modal>
    </>
}
