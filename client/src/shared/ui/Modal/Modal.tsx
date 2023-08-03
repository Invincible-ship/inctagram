'use client'

import { FC, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import cls from './Modal.module.scss'

type ModalProps = {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

const ANIMATION_DELAY = 200

export const Modal: FC<ModalProps> = props => {
  const { children, className, isOpen, onClose } = props

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
