'use client'
import { FC, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CongratulationModal } from './CongratulationModal/CongratulationModal'
import { CongratulationUI } from './ui/CongratulationUI'
import { congratResendMergePropsType } from '@/features/auth/signup/model/types/types'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { ErrorModal } from '../ResendLink/ResendLinkModal/ErrorModal'

const emailIsConfirmed = 'success'
const emailWasUsed = 'confirm'
const noEmail = 'noEmail'
//====================================
const loginPath = '/login'
//====================================
const title = 'congratulation.title'
const text = 'congratulation.text'
const buttonText = 'congratulation.buttonText'
const languageDatabase = 'signUpAdditionPages'

export const Congratulation: FC<congratResendMergePropsType> = ({ lng }) => {
  const { t } = useClientTranslation('', languageDatabase)
  const router = useRouter()
  const search = useSearchParams()
  const [status, setStatus] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (search) {
      const queryStatus = search.get('status')
      {
        queryStatus === emailWasUsed && setIsOpen(true)
      }
      {
        queryStatus ? setStatus(queryStatus) : setStatus(noEmail), setIsOpen(true)
      }
    }
  }, [search])

  const goToLogin = () => {
    router.push(loginPath)
  }
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  if (status === emailIsConfirmed) {
    return (
      <CongratulationUI
        title={t(title)}
        text={t(text)}
        action={goToLogin}
        buttonText={t(buttonText)}
      />
    )
  } else if (status === emailWasUsed) {
    return (
      <>
        <CongratulationUI
          title={t(title)}
          text={t(text)}
          action={goToLogin}
          buttonText={t(buttonText)}
        />
        <CongratulationModal lng={lng} onClose={onClose} isOpen={isOpen} />
      </>
    )
  } else if (status === noEmail) {
    return (
      <>
        <ErrorModal isOpen={isOpen} lng={lng} onClose={onClose} />
      </>
    )
  }
}
