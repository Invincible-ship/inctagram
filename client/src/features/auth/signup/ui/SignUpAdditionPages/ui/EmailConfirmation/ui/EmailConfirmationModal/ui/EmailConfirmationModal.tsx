"use client"
import React, { FC, useState } from 'react'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { ModalWindow, ModalWindowProps } from '@/shared/ui/Modal/children/ui/ModalWindow'

export const EmailConfirmationModal: FC<ModalWindowProps> = ({ lng, onClose, isOpen, userEmail }) => {



    return <>
        <Modal onClose={onClose} isOpen={isOpen}  >
            {/*<ModalWindow lng={lng} onClose={onClose} isOpen={isOpen} userEmail={userEmail} />*/}
            <h1>EmailConfirmationModal</h1>
        </Modal>
    </>
}
