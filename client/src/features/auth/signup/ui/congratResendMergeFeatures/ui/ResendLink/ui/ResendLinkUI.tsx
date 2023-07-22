'use client'

import { FC } from "react"
import { CommonBlock } from "../../CommonBlock/CommonBlock"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import PictureVerification from '@/shared/assets/icons/mergeLinkVerification-image.svg'
import s from './../../styles/congratResendMergeStyles.module.scss'
import { CongratResendUIPropsType } from "../../../model/types/congratResendMergeTypes"

export const ResendLinkUI: FC<CongratResendUIPropsType> = ({ title, text, action, buttonText }) => {
  //action is resendLink from ResendLink

  return <>
    <CommonBlock
      title={title}
      text={text}
    >
      <div className={s.changinBox}>
        <div className={s.buttons}>
          <Button onClick={action} className={s.btn} theme={ButtonTheme.DEFAULT}>{buttonText}</Button>
        </div>
        <div className={s.image}>
          <PictureVerification
            viewBox="0 0 330 246" width="100%"
            className={s.picture}
          />
        </div>
      </div>
    </CommonBlock>
  </>
}
