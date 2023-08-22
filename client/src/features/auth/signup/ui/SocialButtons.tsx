import React from 'react'
import { GoogleButton } from '@/features/auth/signInWithGoogle'
import style from './signup.module.scss'

export const SocialButtons = () => {
  return (
    <div className={style.iconWrapper}>
      <GoogleButton />
      {/* <GitHubButton /> */}
    </div>
  )
}
