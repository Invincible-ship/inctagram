import Image from 'next/image'
import { PostOptionsDropdown } from '@/widgets/PostDetails/ui/PostHeader/PostOptionsDropdown/PostOptionsDropdown'
import s from '../PostDetails.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

const avatar =
  'https://www.ixbt.com/img/n1/news/2021/10/2/22459ff25f8eff76bddf34124cc2c85b16f4cd4a_large.jpg'

type Props = {
  editMode: boolean
  setEditMode: (mode: boolean) => void
}
export const PostHeader = ({ editMode, setEditMode }: Props) => {
  const mods = { [s.noBorder]: editMode }
  const headerClass = classNames(s.headerBlock, mods, [])
  return (
    <header className={headerClass}>
      <div className={s.profileInfo}>
        <Image className={s.imageAvatar} width={34} height={34} src={avatar} alt={'avatar'} />
        <h3 className={s.name}>URLProfiele</h3>
      </div>
      {!editMode && <PostOptionsDropdown setEditMode={setEditMode} />}
    </header>
  )
}
