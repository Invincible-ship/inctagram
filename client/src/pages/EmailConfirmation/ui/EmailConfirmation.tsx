'use client'
import { FC, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { MainComponent } from './MainComponent/MainComponent'
import { useEmailResendingMutation } from '@/entities/User/api/userApi'
import { ModalWindow } from '../../../features/auth/signup/ui/modalWindow/ModalWindow'
import { Preloader } from '@/shared/ui/Preloader/Preloader'
import {
  CONGRATULATION_BUTTON_TEXT,
  CONGRATULATION_TEXT,
  CONGRATULATION_TITLE,
  EMAIL_WAS_USED,
  ERROR_MODAL_TEXT,
  ERROR_MODAL_TITLE,
  LOGIN_PATH,
  MODAL_TEXT,
  MODAL_TITLE,
  MODAL_WAS_USED_TEXT,
  MODAL_WAS_USED_TITLE,
  RESEND_LINK_BUTTON_TEXT,
  RESEND_LINK_TEXT,
  RESEND_LINK_TITLE,
  SUCCESS,
} from '../lib/constants'
import { Namespaces } from '@/shared/config/i18n/types'
import ImageCongratulation from './../../../../public/icons/congratulation.svg'
import ImageResendLink from './../../../../public/icons/resendLink.svg'

export const EmailConfirmation: FC<LngProps> = ({ lng }) => {
  const { t } = useClientTranslation('', Namespaces.EMAIL_CONFIRMATION)
  const router = useRouter()
  const search = useSearchParams()
  const [status, setStatus] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [sendLinkAgain, { isSuccess, isLoading, isError }] = useEmailResendingMutation()

  useEffect(() => {
    if (search) {
      const queryStatus = search.get('status')
      queryStatus === EMAIL_WAS_USED && setIsOpen(true)
      queryStatus && setStatus(queryStatus)

      const queryEmail = search.get('email')
      queryEmail && setEmail(queryEmail)
    }
  }, [search])

  useEffect(() => {
    ;(isSuccess || isError) && setIsOpen(true)
  }, [isSuccess, isError])

  const resendLink = () => {
    email ? sendLinkAgain({ email: email }) : setIsOpen(true)
  }

  const goToLogin = () => {
    router.push(LOGIN_PATH)
  }
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  if (isLoading) {
    return <Preloader />
  }

  //Congratulation page
  if (status === SUCCESS || status === EMAIL_WAS_USED) {
    return (
      <>
        <MainComponent
          t={t}
          icon={<ImageCongratulation />}
          action={goToLogin}
          title={CONGRATULATION_TITLE}
          text={CONGRATULATION_TEXT}
          buttonText={CONGRATULATION_BUTTON_TEXT}
        />
        {status === EMAIL_WAS_USED && (
          <ModalWindow
            isOpen={isOpen}
            onClose={onClose}
            title={t(MODAL_WAS_USED_TITLE)}
            text={t(MODAL_WAS_USED_TEXT)}
          />
        )}
      </>
    )
    //ResendLink page
  } else if (email) {
    return (
      <>
        <MainComponent
          t={t}
          icon={<ImageResendLink />}
          action={resendLink}
          title={RESEND_LINK_TITLE}
          text={RESEND_LINK_TEXT}
          buttonText={RESEND_LINK_BUTTON_TEXT}
        />
        {isSuccess && (
          <ModalWindow
            isOpen={isOpen}
            onClose={onClose}
            title={t(MODAL_TITLE)}
            text={t(MODAL_TEXT)}
            userEmail={email}
          />
        )}
        {isError && (
          <ModalWindow
            isOpen={isOpen}
            onClose={onClose}
            title={t(ERROR_MODAL_TITLE)}
            text={t(ERROR_MODAL_TEXT)}
            userEmail={email}
          />
        )}
      </>
    )
  }
}

type LngProps = { lng: string }
