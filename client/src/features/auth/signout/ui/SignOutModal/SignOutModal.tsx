import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal, ModalBody, ModalHeader } from '@/shared/ui/Modal/Modal'
import { FC } from 'react'
import { TFunction } from 'i18next'
import { useSelector } from 'react-redux'
import { getUserEmail } from '@/entities/User'
import cls from './SignOutModal.module.scss'

type SignOutModalProps = {
  isOpen: boolean
  onClose: () => void
  signOut: () => void
  t: TFunction<string, undefined>
}

export const SignOutModal: FC<SignOutModalProps> = ({ isOpen, onClose, signOut, t }) => {
  const email = useSelector(getUserEmail)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader close={onClose}>{t('signout')}</ModalHeader>
      <ModalBody>
        <p className={cls.text}>
          {t('logout-text')} <b>&quot;{email}</b>&quot;?
        </p>
        <div className={cls.btns}>
          <Button className={cls.btn} theme={ButtonTheme.OUTLINED} onClick={signOut}>
            {t('yes')}
          </Button>
          <Button className={cls.btn} theme={ButtonTheme.DEFAULT} onClick={onClose}>
            {t('no')}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}
