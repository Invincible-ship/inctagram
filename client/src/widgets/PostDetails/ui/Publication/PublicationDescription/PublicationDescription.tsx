import Image from 'next/image'
import s from '@/widgets/PostDetails/ui/PostDetails.module.scss'
import ava from '../../../../../../public/images/avatar-story.jpg'
import HeartIcon from '@/shared/assets/icons/heart-outline.svg'
import PaperPlane from '@/shared/assets/icons/paper-plane-outline.svg'
import BookMark from '@/shared/assets/icons/bookmark.svg'
import { AddComment } from '@/features/addCommentForm/ui/addCommentForm'
import { CommentList } from '@/entities/Comment/ui/CommentList/CommentList'
import { Flex } from '@/shared/ui/Stack'

type Props = {
  avatar: string
  description: string
  userName: string
}
export const PublicationDescription = ({ avatar, description, userName }: Props) => {
  return (
    <div>
      <CommentList description={description} avatar={avatar} userName={userName} />
      <div className={s.publicationFooter}>
        <IconBlock />
        <LikeBlock />
      </div>
      <AddComment />
    </div>
  )
}

const IconBlock = () => {
  return (
    <div className={s.iconBlockContainer}>
      <Flex gap="16">
        <button>
          <HeartIcon />
        </button>
        <button>
          <PaperPlane />
        </button>
      </Flex>
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
        <Image className={s.imageAvatar} width={24} height={24} src={ava} alt="avatar" />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <span className={s.likes}>2 243 'Like'</span>
      </div>
      <span className={s.date}>July 3, 2021</span>
    </div>
  )
}
