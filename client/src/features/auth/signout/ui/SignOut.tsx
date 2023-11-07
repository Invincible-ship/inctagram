'use client'

import { signoutThunk } from '../model/signout'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { CSSProperties, useState } from 'react'
import { SignOutModal } from './SignOutModal/SignOutModal'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { SignOutButton } from './SignOutButton/SignOutButton'

export const SignOut = ({ className, style }: { className?: string; style?: CSSProperties }) => {
  const { t } = useClientTranslation(Namespaces.SIGNOUT)
  const [isSignOutOpen, setIsSignOutOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const onClose = () => setIsSignOutOpen(false)

  const signOut = () => {
    setIsSignOutOpen(false)

    dispatch(signoutThunk())
  }

  return (
    <>
      <SignOutButton
        style={style}
        className={className}
        t={t}
        setIsSignOutOpen={setIsSignOutOpen}
      />
      <SignOutModal isOpen={isSignOutOpen} onClose={onClose} signOut={signOut} t={t} />
    </>
  )
}
