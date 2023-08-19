'use client'

import { signoutThunk } from '../model/signout'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useContext, useState } from 'react'
import { SignOutModal } from './SignOutModal/SignOutModal'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { SignOutButton } from './SignOutButton/SignOutButton'

export const SignOut = () => {
  const lngId = useContext(LanguageContext)
  const { t } = useClientTranslation(lngId, Namespaces.SIGNOUT)
  const [isSignOutOpen, setIsSignOutOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const onClose = () => setIsSignOutOpen(false)

  const signOut = () => {
    setIsSignOutOpen(false)

    dispatch(signoutThunk())
  }

  return (
    <>
      <SignOutButton t={t} setIsSignOutOpen={setIsSignOutOpen} />
      <SignOutModal isOpen={isSignOutOpen} onClose={onClose} signOut={signOut} t={t} />
    </>
  )
}
