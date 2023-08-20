import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { FC } from 'react'
import Link from 'next/link'
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
      <Modal.Header close={onClose}>{t('signout')}</Modal.Header>
      <Modal.Body>
        {/* FIXME: remove test email text */}
        <p className={cls.text}>
          {t('logout-text')} <b>&quot;{email ?? 'test@gmail.com'}</b>&quot;?
        </p>
        <div className={cls.btns}>
          <Link href="/" replace>
            <Button className={cls.btn} theme={ButtonTheme.OUTLINED} onClick={signOut}>
              {t('yes')}
            </Button>
          </Link>
          <Button className={cls.btn} theme={ButtonTheme.DEFAULT} onClick={onClose}>
            {t('no')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
