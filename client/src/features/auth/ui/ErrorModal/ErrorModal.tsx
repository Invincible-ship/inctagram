import { Namespaces } from '@/shared/config/i18n/types'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal, ModalBody, ModalHeader } from '@/shared/ui/Modal/Modal'
import { TFunction } from 'i18next'
import { FC } from 'react'
import cls from './ErrorModal.module.scss'

type ErrorModalProps = {
  username?: string
  email?: string
  errorType?: string
  isOpen: boolean
  t: TFunction<Namespaces, undefined>
  onClose: () => void
}
export const ErrorModal: FC<ErrorModalProps> = props => {
  const { errorType = '', isOpen, t, onClose, email, username } = props

  const errorContent = () => {
    switch (errorType) {
      case 'existedEmail':
        return t(`modal.error.${errorType}`, { email })
      case 'existedUsername':
        return t(`modal.error.${errorType}`, { username })
      default:
        return t(`modal.error.${errorType}`)
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalHeader close={onClose}>{t('modal.error.title')}</ModalHeader>
      <ModalBody>
        <div className={cls.content}>
          <p>{errorContent()}</p>
          <Button className={cls.btn} theme={ButtonTheme.DEFAULT} onClick={onClose}>
            {t('modal.error.ok')}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}
