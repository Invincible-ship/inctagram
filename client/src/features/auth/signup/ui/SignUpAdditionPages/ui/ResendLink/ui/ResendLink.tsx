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
import { rtkApi } from '@/shared/api/rtkApi'
import { useEmailResendingMutation } from "../../../model/resendLinkAPI"



const title = 'resendLink.title'
const text = 'resendLink.text'
const buttonText = 'resendLink.buttonText'
const languageDatabase = 'signUpAdditionPages'

export const ResendLink: FC<SignUpAdditionPagespProps> = ({ lng }) => {
  console.log('Render');

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>()
  const search = useSearchParams()
  const [sendLinkAgain, { isSuccess, isLoading, isError }] = useEmailResendingMutation()

  useEffect(() => {
    if (search) {
      const queryEmail = search.get('email')
      { queryEmail && setEmail(queryEmail) }
    }
    { (isSuccess || isError) && setIsOpen(true) }
  }, [search, isSuccess, isError])

  const resendLink = () => {
    { email && sendLinkAgain({ email: email }) }
  }

  const onClose = () => {
    setIsOpen(false);
  }

  const { t } = useClientTranslation(lng, languageDatabase)

  if (isLoading) {
    return <div>Loading...</div>
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
    {/* так перересовывается 2 раза */}
    {isError && <ErrorModal lng={lng} isOpen={isOpen} onClose={onClose} userEmail={email} />}
    {isSuccess && <ResendLinkModal lng={lng} isOpen={isOpen} onClose={onClose} userEmail={email} />}

    {/* так перересовывается 1 раз */}
    {/*{isError
      ? <ErrorModal lng={lng} isOpen={isOpen} onClose={onClose} userEmail={email} />
      : <ResendLinkModal lng={lng} isOpen={isOpen} onClose={onClose} userEmail={email} />
    }*/}

  </>
}