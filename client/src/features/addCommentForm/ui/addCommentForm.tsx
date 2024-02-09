import s from './addCommentForm.module.scss'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

export const AddComment = () => {
  return (
    <div className={s.addCommentBlockContainer}>
      <input placeholder={'Add a Comment...'} type={'text'} className={s.addInput}></input>
      <Button theme={ButtonTheme.TEXT}>Publish</Button>
    </div>
  )
}
