import { Namespaces } from '@/shared/config/i18n/types'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { TFunction } from 'i18next'
import { FC } from 'react'
import cls from './ErrorModal.module.scss'

type ErrorModalProps = {
  email?: string
  errorType?: string
  isOpen: boolean
  t: TFunction<Namespaces, undefined>
  onClose: () => void
}
export const ErrorModal: FC<ErrorModalProps> = props => {
  const { errorType = '', isOpen, t, onClose, email } = props
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <Modal.Header close={onClose}>{t('modal.error.title')}</Modal.Header>
      <Modal.Body>
        <div className={cls.content}>
          <p>{email ? t(`modal.error.${errorType}`, { email }) : t(`modal.error.${errorType}`)}</p>
          <Button className={cls.btn} theme={ButtonTheme.DEFAULT} onClick={onClose}>
            {t('modal.error.ok')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
