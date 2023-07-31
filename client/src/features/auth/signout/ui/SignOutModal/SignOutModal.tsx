import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import { Modal } from "@/shared/ui/Modal/Modal"
import { FC } from "react"
import cls from './SignOutModal.module.scss'
import Link from "next/link"
import { useClientTranslation } from "@/shared/config/i18n/client"

type SignOutModalProps = {
  isOpen: boolean,
  onClose: () => void,
  signOut: () => void
}

export const SignOutModal: FC<SignOutModalProps> = (
  { isOpen, onClose, signOut }
) => {
  const { t } = useClientTranslation('', 'signout')

  return (
    <Modal
      className={cls.signoutModal}
      isOpen={isOpen}
      onClose={onClose}
    >
      <p>Are you shure?</p>
      <Link href="/" replace>
        <Button 
          theme={ButtonTheme.DEFAULT}
          onClick={signOut}
        >
          Yes
        </Button>
      </Link>
      <Button 
        theme={ButtonTheme.SECONDARY}
        onClick={onClose}
      >
        No
      </Button>
    </Modal>
  )
}
 