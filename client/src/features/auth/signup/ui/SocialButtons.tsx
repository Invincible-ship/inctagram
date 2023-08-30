import React from 'react'
import { GoogleButton } from '@/features/auth/signInWithGoogle'
import { GithubButton } from '@/features/auth/signInWithGithub'
import style from './signup.module.scss'

export const SocialButtons = () => {
  return (
    <div className={style.iconWrapper}>
      <GoogleButton />
      <GithubButton />
    </div>
  )
}
