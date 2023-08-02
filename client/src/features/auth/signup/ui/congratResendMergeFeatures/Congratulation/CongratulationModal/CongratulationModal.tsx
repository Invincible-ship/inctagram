'use client'
import React, { FC } from 'react'
import '@/shared/styles/reset.scss'
import '@/shared/styles/variables/common/_buttons.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { ModalWindow } from '@/shared/ui/Modal/children/ModalWindow'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { ModalPropsType } from '@/features/auth/signup/model/types/types'

const modalTitle = 'emailConfirmationModal.title'
const modalText = 'emailConfirmationModal.text'
const languageDatabase = 'signUpModal'

export const CongratulationModal: FC<ModalPropsType> = ({ lng, onClose, isOpen }) => {
  const { t } = useClientTranslation('', languageDatabase)

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalWindow onClose={onClose} isOpen={isOpen} title={t(modalTitle)} text={t(modalText)} />
      </Modal>
    </>
  )
}
