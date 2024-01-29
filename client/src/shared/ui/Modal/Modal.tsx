'use client'

import { ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import CloseIcon from '@/shared/assets/icons/close.svg'
import cls from './Modal.module.scss'

type ModalProps = {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  width?: number | string
}

const ANIMATION_DELAY = 200

export const Modal = (props: ModalProps) => {
  const { children, className, isOpen, onClose, width } = props

  const { isClosing, close } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  })

  const mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
}

Modal.displayName = 'Modal'

type ModalHeaderProps = {
  children: ReactNode
  close: () => void
  width?: number | string
}

//eslint-disable-next-line
Modal.Header = ({ children, close, width }: ModalHeaderProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
Modal.Body = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={classNames(cls.body, {}, [className])}>{children}</div>
}
