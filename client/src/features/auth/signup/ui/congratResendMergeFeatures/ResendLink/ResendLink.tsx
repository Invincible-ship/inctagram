'use client'

import { FC, useEffect, useState } from "react"
import { congratResendMergePropsType } from "@/features/auth/signup/model/types/types"
import { useClientTranslation } from "@/shared/config/i18n/client"
import { ResendLinkModal } from "./ResendLinkModal/ResendLinkModal"
import { useSearchParams } from "next/navigation"
import { ErrorModal } from "./ResendLinkModal/ErrorModal"
import { useEmailResendingMutation } from "@/features/auth/signup/model/api/signUpApi"
import { Preloader } from "@/shared/ui/Preloader/Preloader"
import { ResendLinkUI } from "./ui/ResendLinkUI"

const languageDatabase = 'signUpAdditionPages'
const title = 'resendLink.title'
const text = 'resendLink.text'
const buttonText = 'resendLink.buttonText'

export const ResendLink: FC<congratResendMergePropsType> = ({ lng }) => {

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
    setIsOpen(false)
  }

  const resendLink = () => {
    { email ? sendLinkAgain({ email: email }) : setIsOpen(true) }
  }

  if (isLoading) {
    return <Preloader />
  }

  return <>
    <ResendLinkUI
      title={t(title)}
      text={t(text)}
      action={resendLink}
      buttonText={t(buttonText)}
    />
    {noEmail && <ErrorModal lng={lng} isOpen={isOpen} onClose={onClose} />}
    {isError && <ErrorModal lng={lng} isOpen={isOpen} onClose={onClose} userEmail={email} />}
    {isSuccess && <ResendLinkModal lng={lng} isOpen={isOpen} onClose={onClose} userEmail={email} />}
  </>
}