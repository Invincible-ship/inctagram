import s from './CommentList.module.scss'
import ava from '../../../../../public/images/avatar-story.jpg'
import HeartIconMin from '@/shared/assets/icons/heart-outline-min.svg'
import { CommentCard } from '@/entities/Comment/ui/CommentCard/CommentCard'

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const user = 'URLProfiele '

type Props = {
  avatar: string
  description: string
  userName: string
}
export const CommentList = (props: Props) => {
  const { description, userName, avatar } = props
  return (
    <div className={s.publicationBlock}>
      <CommentCard userName={userName} textValue={description} avatar={avatar} />
      <CommentCard userName={user} textValue={text} avatar={ava.src}>
        <HeartIconMin />
      </CommentCard>
      <CommentCard userName={user} textValue={text} avatar={ava.src}>
        <HeartIconMin />
      </CommentCard>
    </div>
  )
}
