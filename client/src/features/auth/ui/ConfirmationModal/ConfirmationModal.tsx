import { Namespaces } from '@/shared/config/i18n/types'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { TFunction } from 'i18next'
import { FC } from 'react'
import cls from './ConfirmationModal.module.scss'

type SignUpModalProps = {
  email: string
  isOpen: boolean
  t: TFunction<Namespaces, undefined>
  onClose: () => void
}
export const ConfirmationModal: FC<SignUpModalProps> = props => {
  const { email, isOpen, t, onClose } = props
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <Modal.Header close={onClose}>{t('modal.title')}</Modal.Header>
      <Modal.Body>
        <div className={cls.content}>
          <p>
            {t('modal.text')} {` ${email}`}
          </p>
          <Button className={cls.btn} theme={ButtonTheme.DEFAULT} onClick={onClose}>
            {t('modal.ok')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
