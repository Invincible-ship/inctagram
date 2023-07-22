import { FC, ReactNode } from 'react'
import s from './../../ui/styles/congratResendMergeStyles.module.scss'

export const CommonBlock: FC<CommonBlockProps> =
  ({ email, title, text, textSecondPart, children }) => {
    return <>
      <div className={s.accountMerging}>
        <div className={s.wrapper}>
          <div className={s.body}>
            <div className={s.title}>
              <h3>{title}</h3>
            </div>
            <div className={s.content}>
              <p>{text} {email} {textSecondPart}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  }

//========================================================================================================================================================

type CommonBlockProps = {
  title: string
  text: string | any
  textSecondPart?: string | any
  children: ReactNode
  email?: string
}
