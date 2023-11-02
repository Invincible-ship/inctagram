import { Namespaces } from '@/shared/config/i18n/types'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { TFunction } from 'i18next'
import { FC } from 'react'
import cls from './SignUpModal.module.scss'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {setIsSignUpModalOpen} from "@/features/auth/signup/model/slice/signUpSlice";

type SignUpModalProps = {
  email: string
  isSignUpModalOpen: boolean
  t: TFunction<Namespaces, undefined>
}

export const SignUpModal: FC<SignUpModalProps> = props => {
  const { email, isSignUpModalOpen, t } = props
  const dispatch = useAppDispatch()

  const onClose = () => dispatch(setIsSignUpModalOpen(false))

  return (
    <Modal onClose={onClose} isOpen={isSignUpModalOpen}>
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
