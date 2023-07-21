'use client'

import { FC } from "react"
import { CommonBlock } from "../../CommonBlock/ui/CommonBlock"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import PictureVerification from '@/shared/assets/icons/mergeLinkVerification-image.svg'
import s from './../../SignUpAdditionPagesStyles/SignUpAdditionPages.module.scss'

export const ResendLinkUI: FC<ResendLinkUIPropsType> = ({ title, text, buttonText, resendLink }) => {

  return <>
    <CommonBlock
      title={title}
      text={text}
    >
      <div className={s.changinBox}>
        <div className={s.buttons}>
          <Button onClick={resendLink} className={s.btn} theme={ButtonTheme.DEFAULT}>{buttonText}</Button>
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

//types========================================================================================================================================================
type ResendLinkUIPropsType = {
  title: string
  text: string
  buttonText: string
  resendLink: () => void
}