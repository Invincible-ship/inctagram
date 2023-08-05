'use client'
import { FC } from 'react'
import s from './modalWindow.module.scss'
import { Close } from './Close'

export type HeaderProps = {
  title: string
  onClose: () => void
}

export const Header: FC<HeaderProps> = ({ title, onClose }) => {
  return (
    <>
      <div className={s.header}>
        <h3>{title}</h3>
        <div data-testid={'ModalWindowStioryTestId'} onClick={onClose} className={s.xButton}>
          <Close />
        </div>
      </div>
    </>
  )
}
