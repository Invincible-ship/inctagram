'use client'
import { FC } from 'react'
import s from './modalWindow.module.scss'
import { Close } from './Close'
import { Button } from '@/shared/ui/Button/Button'

export type BodyProps = {
  userEmail?: string
  text: string
  onClose: () => void
}

export const Body: FC<BodyProps> = ({ userEmail, text, onClose }) => {
  return (
    <>
      <div className={s.content}>
        {userEmail
          ? text && (
              <p className={s.text}>
                {text} {userEmail}
              </p>
            )
          : text && <p className={s.text}>{text}</p>}
        <div className={s.buttonContainer}>
          <Button onClick={onClose} type="button" className={s.button}>
            OK
          </Button>
        </div>
      </div>
    </>
  )
}
