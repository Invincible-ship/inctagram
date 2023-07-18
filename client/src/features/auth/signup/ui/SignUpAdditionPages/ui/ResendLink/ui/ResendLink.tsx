'use client'

import { FC, useEffect, useState } from "react"
import { CommonBlock, SignUpAdditionPagespProps } from "../../CommonBlock/ui/CommonBlock"
import { useClientTranslation } from "@/shared/config/i18n/client"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import PictureVerification from '@/shared/assets/icons/mergeLinkVerification-image.svg'
import s from './../../SignUpAdditionPagesStyles/SignUpAdditionPages.module.scss'
import { ResendLinkModal } from "./ResendLinkModal/ui/ResendLinkModal"
import { useSearchParams } from "next/navigation"
import { ErrorModal } from "./ResendLinkModal/ui/ErrorModal"
import { useEmailResendingMutation } from "../../../model/resendLinkAPI"
import { Preloader } from "@/shared/ui/Preloader/Preloader"

const languageDatabase = 'signUpAdditionPages'
const title = 'resendLink.title'
const text = 'resendLink.text'
const buttonText = 'resendLink.buttonText'

export const ResendLink: FC<SignUpAdditionPagespProps> = ({ lng }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>()
  const [noEmail, setNoEmail] = useState<boolean>(false)
  const search = useSearchParams()
  const { t } = useClientTranslation(lng, languageDatabase)
  const [sendLinkAgain, { isSuccess, isLoading, isError }] = useEmailResendingMutation()

  useEffect(() => {
    if (search) {
      const queryEmail = search.get('email')
      { queryEmail ? setEmail(queryEmail) : setNoEmail(true) }
    }
  }, [search])

  useEffect(() => {
    { (isSuccess || isError) && setIsOpen(true) }
  }, [isSuccess, isError])

  const onClose = () => {
    setIsOpen(false);
  }

  const resendLink = () => {
    { email ? sendLinkAgain({ email: email }) : setIsOpen(true) }
  }

  if (isLoading) {
    return <Preloader />;
  }

  return <>
    <CommonBlock
      title={t(title)}
      text={t(text)}
    >
      <div className={s.changinBox}>
        <div className={s.buttons}>
          <Button onClick={resendLink} className={s.btn} theme={ButtonTheme.DEFAULT}>{t(buttonText)}</Button>
        </div>
        <div className={s.image}>
          <PictureVerification
            viewBox="0 0 330 246" width="100%"
            className={s.picture}
          />
        </div>
      </div>
    </CommonBlock>
    {noEmail && <ErrorModal lng={lng} isOpen={isOpen} onClose={onClose} />}
    {isError && <ErrorModal lng={lng} isOpen={isOpen} onClose={onClose} userEmail={email} />}
    {isSuccess && <ResendLinkModal lng={lng} isOpen={isOpen} onClose={onClose} userEmail={email} />}
  </>
}