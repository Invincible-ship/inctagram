'use client'
import { FC } from "react"
import { CommonBlock } from "../../CommonBlock/CommonBlock"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import PictureCongratulation from '@/shared/assets/icons/mergeDone-image.svg'
import s from './../../styles/congratResendMergeStyles.module.scss'
import { CongratResendUIPropsType } from "../../../model/types/congratResendMergeTypes"



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
          <PictureCongratulation
            //! viewBox размеры по макету - hardcode
            viewBox="0 0 432 300" width="100%"
            className={s.picture}
          />
        </div>
      </div>
    </CommonBlock>
  </>
}