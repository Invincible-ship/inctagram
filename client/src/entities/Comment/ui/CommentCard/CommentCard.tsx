import s from './CommentCard.module.scss'
import Image from 'next/image'
import { ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'

type Props = {
  avatar: string
  userName: string
  textValue: string
  children?: ReactNode
  className?: string
}
export const CommentCard = (props: Props) => {
  const { children, userName, textValue, avatar, className } = props
  return (
    <div className={s.itemDescription}>
      <Image className={s.imageAvatar} width={34} height={34} src={avatar} alt={'avatar'} />
      <div className={classNames(s.commentBlock, {}, [className])}>
        <span className={s.itemName}>{userName}</span>
        <span className={s.itemText}>{textValue}</span>
        <div className={s.itemTimestamp}>2 hours ago</div>
      </div>
      <div className={s.itemDescriptionChildren}>{children}</div>
    </div>
  )
}
