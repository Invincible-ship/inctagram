'use client'
import { FC } from "react"
import { CommonBlock } from "../../CommonBlock/CommonBlock"
import { useClientTranslation } from "@/shared/config/i18n/client"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import PictureCongratulation from '@/shared/assets/icons/mergeDone-image.svg'
import s from './../../styles/congratResendMergeStyles.module.scss'
import { congratResendMergePropsType } from "../../../model/types/congratResendMergeTypes"

const title = 'congratulation.title'
const text = 'congratulation.text'
const buttonText = 'congratulation.buttonText'
const languageDatabase = 'signUpAdditionPages'

export const CongratulationUI: FC<congratResendMergePropsType> = ({ lng, buttonAction }) => {
  //buttonAction is goToLogin from EmailConfirmation

  const { t } = useClientTranslation(lng, languageDatabase)
  return <>
    <CommonBlock
      title={t(title)}
      text={t(text)}
    >
      <div className={s.changinBox}>
        <div className={s.buttons}>
          <Button onClick={buttonAction} className={s.btn} theme={ButtonTheme.DEFAULT}>{t(buttonText)}</Button>
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