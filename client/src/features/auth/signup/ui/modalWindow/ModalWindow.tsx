'use client'
import { FC } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import s from './modalWindow.module.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Close } from './Close'
import { Header } from './ModalWindow.Header'
import { Body } from './ModalWindow.Body'

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
      <Modal onClose={onClose} isOpen={isOpen}>
        <div data-testid="ModalWindow" className={s.wrapper}>
          <div className={s.body}>
            <Header onClose={onClose} title={title} />
            <Body onClose={onClose} text={text} userEmail={userEmail} />
          </div>
        </div>
      </Modal>
    </>
  )
}
