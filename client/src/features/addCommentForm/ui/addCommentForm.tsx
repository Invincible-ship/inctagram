import { useClientTranslation } from '@/shared/config/i18n/client'
import s from './addCommentForm.module.scss'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { classNames } from '@/shared/lib/classNames/classNames'
import { FC } from 'react'

type AddCommentProps = {
  className?: string
}

export const AddComment: FC<AddCommentProps> = ({ className }) => {
  const { t } = useClientTranslation()

  return (
    <div className={s.addCommentBlockContainer}>
      <input
        placeholder={t('comment.publishPlaceholder')}
        type={'text'}
        className={classNames(s.addInput, {}, [className])}
      ></input>
      <Button theme={ButtonTheme.TEXT}>{t('comment.publish')}</Button>
    </div>
  )
}
