import { Modal } from '@/shared/ui/Modal/Modal'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import s from './PostConfirmationModal.module.scss'
import { HStack } from '@/shared/ui/Stack'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'

type Props = {
  onClick: () => void
  title: string
  text: string
  handleClose: () => void
  isOpen: boolean
  isLoading?: boolean
  t: TFunction<Namespaces, undefined>
}
export const PostConfirmationModal = (props: Props) => {
  const { isLoading, isOpen, text, title, handleClose, onClick, t } = props
  return (
    <Modal onClose={handleClose} isOpen={isOpen}>
      <Modal.Header close={handleClose}>{title}</Modal.Header>
      <Modal.Body>
        <div className={s.text}>{text}</div>
        <HStack className={s.modalButtons} justify="end" align={'center'} gap="24">
          <Button isLoading={isLoading} theme={ButtonTheme.OUTLINED} onClick={onClick}>
            {t('Yes')}
          </Button>
          <Button theme={ButtonTheme.DEFAULT} onClick={handleClose}>
            {t('No')}
          </Button>
        </HStack>
      </Modal.Body>
    </Modal>
  )
}
