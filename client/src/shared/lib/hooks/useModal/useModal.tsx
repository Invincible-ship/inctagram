import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

type UseModalProps = {
  onClose?: () => void
  isOpen?: boolean
  withoutAnimation?: boolean
  animationDelay: number
}

export const useModal = ({ onClose, animationDelay, isOpen, withoutAnimation }: UseModalProps) => {
  const [isClosing, setIsClosing] = useState<boolean>(false)
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  const close = useCallback(() => {
    if (onClose) {
      if (withoutAnimation) return onClose()

      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, animationDelay)
    }
  }, [onClose, animationDelay, withoutAnimation])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key == 'Escape') {
        close()
      }
    },
    [close],
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      clearTimeout(timerRef.current)
    }
  }, [isOpen, onKeyDown])

  return {
    isClosing,
    close,
  }
}
