"use client"

import { signoutThunk } from "@/features/auth/signout"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import { FC, useState } from "react"
import SignOutIcon from '@/shared/assets/icons/log-out.svg'
import { SignOutModal } from "../SignOutModal/SignOutModal"
import cls from './SignOutButton.module.scss'
import { useClientTranslation } from "@/shared/config/i18n/client"

type SignOutButtonProps = {
  lngId: string
}

export const SignOutButton: FC<SignOutButtonProps> = ({ lngId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation(lngId, 'signout')

  const onClose = () => setIsOpen(false)

  const signOut = () => {
    setIsOpen(false)

    dispatch(signoutThunk())
  }

  return (
    <>
      <Button 
        theme={ButtonTheme.TEXT}
        onClick={() => setIsOpen(true)}
      >
        <p className={cls.icon}><SignOutIcon /></p>
        <p className={cls.text}>{t('signout')}</p>
      </Button>
      <SignOutModal isOpen={isOpen} onClose={onClose} signOut={signOut} lngId={lngId} />
    </>
  )
}