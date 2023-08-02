'use client'
import { FC } from "react"
import { CommonBlock } from "../../CommonBlock/CommonBlock"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import { PictureCongratulation } from "./PictureCongratulation"
import s from './../../styles/congratResendMergeStyles.module.scss'
import { CongratResendUIPropsType } from "@/features/auth/signup/model/types/types"

export const CongratulationUI: FC<CongratResendUIPropsType> = ({ title, text, action, buttonText }) => {
  //action is goToLogin from Congratulation

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
          <PictureCongratulation />
        </div>
      </div>
    </CommonBlock>
  </>
}