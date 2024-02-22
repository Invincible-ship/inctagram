import { useClientTranslation } from '@/shared/config/i18n/client'
import s from './addCommentForm.module.scss'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

export const AddComment = () => {
  const { t } = useClientTranslation()

  return (
    <div className={s.addCommentBlockContainer}>
      <input
        placeholder={t('comment.publishPlaceholder')}
        type={'text'}
        className={s.addInput}
      ></input>
      <Button theme={ButtonTheme.TEXT}>{t('comment.publish')}</Button>
    </div>
  )
}
