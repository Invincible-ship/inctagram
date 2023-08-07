import { Children, FC, ReactNode } from 'react'
import s from './emailConfirmation.module.scss'

type ImageComponentProps = {
  children: ReactNode
}

export const ImageComponent: FC<ImageComponentProps> = ({ children }) => {
  return (
    <>
      <div className={s.image}>{children}</div>
    </>
  )
}
