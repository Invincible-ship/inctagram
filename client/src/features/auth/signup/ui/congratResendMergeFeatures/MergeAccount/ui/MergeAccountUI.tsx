'use client'

import { FC } from 'react'
import { CommonBlock } from '../../CommonBlock/CommonBlock'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import PictureQuestion from '@/shared/assets/icons/merge-image.svg'
import s from './../../SignUpAdditionPagesStyles/SignUpAdditionPages.module.scss'
import { congratResendMergePropsType } from '@/features/auth/signup/model/types/types'

const text = 'merge.text.textFirstPart'
const textSecondPart = 'merge.text.textSecondPart'
const title = 'merge.title'
const yes = 'merge.buttonText.yesMerge'
const no = 'merge.buttonText.no'
const languageDatabase = 'signUpAdditionPages'
const emailExample = ' Email for example: Epam@epam.com '

export const MergeAccountUI: FC<congratResendMergePropsType> = ({ lng }) => {
  const { t } = useClientTranslation('', languageDatabase)
  return (
    <>
      <CommonBlock
        email={emailExample}
        textSecondPart={t(textSecondPart)}
        text={t(text)}
        title={t(title)}
      >
        <div className={s.changinBox}>
          <div className={s.buttons}>
            <Button className={s.btn} theme={ButtonTheme.OUTLINED}>
              {t(yes)}
            </Button>
            <Button className={s.btn} theme={ButtonTheme.OUTLINED}>
              {t(no)}
            </Button>
          </div>
          <div className={s.image}>
            <PictureQuestion
              viewBox="0 0 432 300"
              width="100%" //*! из-за этого я потратил целый день. так SVG адаптируется
              className={s.picture}
            />
          </div>
        </div>
      </CommonBlock>
    </>
  )
}
