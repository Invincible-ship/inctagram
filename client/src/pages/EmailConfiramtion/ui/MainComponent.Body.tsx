import { FC } from 'react'
import s from './emailConfiramtion.module.scss'

type TextContentProps = {
  text: string
}

export const TextContent: FC<TextContentProps> = ({ text }) => {
  return (
    <div className={s.content}>
      <p>{text}</p>
    </div>
  )
}
