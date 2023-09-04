'use client'
import { FC } from 'react'
import s from './modalWindow.module.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Button } from '@/shared/ui/Button/Button'

export type ModalWindowPropsType = {
  onClose: () => void
  isOpen: boolean
  userEmail?: string
  title: string
  text: string
}

export const ModalWindow: FC<ModalWindowPropsType> = ({
  isOpen,
  onClose,
  userEmail,
  title,
  text,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Header close={onClose}>{title}</Modal.Header>
        <Modal.Body>
          <div className={s.content}>
            <p className={s.text}>
              {text} {userEmail}
            </p>
            <div className={s.buttonContainer}>
              <Button onClick={onClose} type="button" className={s.button}>
                OK
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
