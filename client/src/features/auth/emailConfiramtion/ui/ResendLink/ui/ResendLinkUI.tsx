'use client'

import { FC } from 'react'
import { CommonBlock } from '../../components/CommonBlock/CommonBlock'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import s from './../../components/styles/congratResendMergeStyles.module.scss'
import { CongratResendUIPropsType } from '@/features/auth/signup/model/types/types'
import { PictureVerification } from './PictureVerification'

export const ResendLinkUI: FC<CongratResendUIPropsType> = ({ title, text, action, buttonText }) => {
  //action is resendLink from ResendLink

  return (
    <>
      <CommonBlock title={title} text={text}>
        <div className={s.changinBox}>
          <div className={s.buttons}>
            <Button onClick={action} className={s.btn} theme={ButtonTheme.DEFAULT}>
              {buttonText}
            </Button>
          </div>
          <div className={s.image}>
            <PictureVerification />
          </div>
        </div>
      </CommonBlock>
    </>
  )
}
