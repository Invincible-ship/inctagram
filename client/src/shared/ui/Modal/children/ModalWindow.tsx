'use client'
import { FC } from "react"
import { Button } from "@/shared/ui/Button/Button"
import s from './modalWindow.module.scss'
import { Close } from "./CloseImageSVG/Close"

export type ModalWindowPropsType = {
  onClose?: () => void;
  isOpen: boolean;
  userEmail?: string,
  title: string,
  text: string,
}

export const ModalWindow: FC<ModalWindowPropsType> = ({ onClose, userEmail, title, text }) => {
  return (
    <div data-testid="ModalWindow" className={s.wrapper}>
      <div className={s.body}>
        <div className={s.title}>
          <h3>{title}</h3>
          <div data-testid={'ModalWindowStioryTestId'} onClick={onClose} className={s.xButton}>
            <Close />
          </div>
        </div>
        <div className={s.content}>
          {userEmail
            ? (text && <p className={s.text}>{text} {userEmail}</p>)
            : (text && <p className={s.text}>{text}</p>)
          }
          <div className={s.buttonContainer}>
            <Button data-testid="closeButton" onClick={onClose} type='button' className={s.button}>OK</Button>
          </div>
        </div>
      </div>
    </div >
  )
}