import { ChangeEvent, MouseEvent } from 'react'
import s from '@/widgets/PostDetails/PostDetails.module.scss'
import { TextArea } from '@/shared/ui/TextArea/TextArea'
import { Button } from '@/shared/ui/Button/Button'
import { useUpdatePostByIdMutation } from '@/entities/Post/api/postApi'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import toast from 'react-hot-toast'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'

type Props = {
  setEditMode: (mode: boolean) => void
  id: number
  description: string
  textValue: string
  setTextValue: (text: string) => void
}
export const PublicationForm = (props: Props) => {
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)
  const { setEditMode, id, description, textValue, setTextValue } = props
  const [update, { isLoading }] = useUpdatePostByIdMutation()
  const onClickSaveChangesHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      if (description !== textValue) await update({ description: textValue, id })
      setTextValue(textValue)
      setEditMode(false)
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const apiError = error.data as ApiError
        if (Array.isArray(apiError.messages)) {
          toast.error(apiError.messages[0].message)
        }
      }
    }
  }
  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value)
  }

  return (
    <div className={s.publicationBlock}>
      <form className={s.form}>
        <TextArea
          className={s.textArea}
          id="publication descriptions"
          title={t('textAreaDescriptions')}
          withCounter={true}
          value={textValue}
          onChange={onChangeHandler}
        />
        <Button isLoading={isLoading} type="submit" onClick={onClickSaveChangesHandler}>
          {t('saveChanges')}
        </Button>
      </form>
    </div>
  )
}
