import Image from 'next/image'
import s from '@/widgets/PostDetails/PostDetails.module.scss'
import ava from 'public/images/avatar-story.jpg'
import HeartIconMin from '@/shared/assets/icons/heart-outline-min.svg'
import React, { ReactNode } from 'react'
import HeartIcon from '@/shared/assets/icons/heart-outline.svg'
import PaperPlane from '@/shared/assets/icons/paper-plane-outline.svg'
import BookMark from '@/shared/assets/icons/bookmark.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const user = 'URLProfiele '

type Props = {
  avatar: string
  textValue: string
  userName: string
}
export const PublicationDescription = ({ avatar, textValue, userName }: Props) => {
  return (
    <div>
      <div className={s.publicationBlock}>
        <ItemDescription userName={userName} textValue={textValue} avatar={avatar} />
        <ItemDescription userName={user} textValue={text} avatar={ava.src}>
          <HeartIconMin />
        </ItemDescription>
        <ItemDescription userName={user} textValue={text} avatar={ava.src}>
          <HeartIconMin />
        </ItemDescription>
      </div>
      <div className={s.publicationFooter}>
        <IconBlock />
        <LikeBlock />
      </div>
      <AddCommentBlock />
    </div>
  )
}

type PropsItem = {
  avatar: string
  textValue: string
  userName?: string
  children?: ReactNode
}
const ItemDescription = ({ avatar, textValue, userName, children }: PropsItem) => {
  return (
    <div className={s.itemDescription}>
      <Image className={s.imageAvatar} width={34} height={34} src={avatar} alt={'avatar'} />
      <div>
        <span className={s.itemName}>{userName}</span>
        <span className={s.itemText}>{textValue}</span>
        <div className={s.itemTimestamp}>2 hours ago</div>
      </div>
      <div className={s.itemDescriptionChildren}>{children}</div>
    </div>
  )
}

const IconBlock = () => {
  return (
    <div className={s.iconBlockContainer}>
      <div className={s.iconBlockLeft}>
        <button>
          <HeartIcon />
        </button>
        <button>
          <PaperPlane />
        </button>
      </div>
      <button>
        <BookMark />
      </button>
    </div>
  )
}

const LikeBlock = () => {
  return (
    <div>
      <div className={s.likeBlockContainer}>
        <Image className={s.imageAvatar} width={24} height={24} src={ava} alt={'avatar'} />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <span className={s.likes}>2 243 'Like'</span>
      </div>
      <span className={s.date}>July 3, 2021</span>
    </div>
  )
}

const AddCommentBlock = () => {
  return (
    <div className={s.addCommentBlockContainer}>
      <input placeholder={'Add a Comment...'} type={'text'} className={s.addInput}></input>
      <Button theme={ButtonTheme.TEXT}>Publish</Button>
    </div>
  )
}
