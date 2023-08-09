"use client"

import { FC, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import CloseIcon from '@/shared/assets/icons/close.svg'
import cls from './Modal.module.scss'

type ModalProps = {
  className?: string,
  children?: ReactNode,
  isOpen?: boolean,
  onClose?: () => void
}

const ANIMATION_DELAY = 200

export const Modal = (props: ModalProps) => {
  const { children, className, isOpen, onClose } = props

  const { isClosing, close } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen
  })

  const mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

type ModalHeaderProps = {
  children: ReactNode,
  close: () => void,
}

//eslint-disable-next-line
Modal.Header = ({ children, close }: ModalHeaderProps) => {
  return (
    <div className={cls.header}>
      <h2 className={cls.title}>{children}</h2>
      <span className={cls.close} onClick={close}>
        <CloseIcon />
      </span>
    </div>
  )
}

//eslint-disable-next-line
Modal.Body = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cls.body}>
      {children}
    </div>
  )
}