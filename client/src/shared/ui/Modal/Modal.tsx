'use client'

import { ReactNode, memo } from 'react'
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
  withoutAnimation?: boolean
  width?: number | string
}

const ANIMATION_DELAY = 200

export const Modal = memo((props: ModalProps) => {
  const { children, className, isOpen, onClose, withoutAnimation } = props

  const { isClosing, close } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
    withoutAnimation,
  })

  const mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
    [cls.withoutAnimation]: withoutAnimation,
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
})

Modal.displayName = 'Modal'

type ModalHeaderProps = {
  children: ReactNode
  close: () => void
  width?: number | string
}

export const ModalHeader = memo(({ children, close }: ModalHeaderProps) => {
  return (
    <div className={cls.header}>
      <h2 className={cls.title}>{children}</h2>
      <span className={cls.close} onClick={close}>
        <CloseIcon />
      </span>
    </div>
  )
})

ModalHeader.displayName = 'ModalHeader'

export const ModalBody = memo(
  ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={classNames(cls.body, {}, [className])}>{children}</div>
  },
)

ModalBody.displayName = 'ModalBody'
