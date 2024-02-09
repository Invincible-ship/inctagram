import { ChangeEvent, MouseEvent } from 'react'
import s from './PublicationForm.module.scss'
import { TextArea } from '@/shared/ui/TextArea/TextArea'
import { Button } from '@/shared/ui/Button/Button'
import { useUpdatePostByIdMutation } from '@/entities/Post/api/postApi'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import toast from 'react-hot-toast'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { setEditMode, setTextValue } from '@/widgets/PostDetails/model/slice/postDetailsSlice'

type Props = {
  id: number
  description: string
  textValue: string
}
export const PublicationForm = (props: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)
  const { id, description, textValue } = props
  const [update, { isLoading }] = useUpdatePostByIdMutation()
  const onClickSaveChangesHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      if (description !== textValue) await update({ description: textValue, id })
      dispatch(setEditMode(false))
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
    dispatch(setTextValue(event.target.value))
  }

  return (
    <div className={s.editModeBlock}>
      <form className={s.form}>
        <TextArea
          className={s.textArea}
          id="publication descriptions"
          title={t('textAreaDescriptions')}
          withCounter={true}
          value={textValue}
          onChange={onChangeHandler}
        />
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          type="submit"
          onClick={onClickSaveChangesHandler}
        >
          {t('saveChanges')}
        </Button>
      </form>
    </div>
  )
}
