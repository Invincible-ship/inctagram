import { PostDetailsConfirmationModal, getCurrentPost } from '@/entities/Post'
import { useUpdatePostByIdMutation } from '@/entities/Post/api/postApi'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import { Namespaces } from '@/shared/config/i18n/types'
import { TFunction } from 'i18next'
import {
  FC,
  memo,
  useState,
  ChangeEvent,
  useMemo,
  FormEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import cls from './UpdatePostForm.module.scss'
import { VStack } from '@/shared/ui/Stack'
import { TextArea } from '@/shared/ui/TextArea/TextArea'
import { Button } from '@/shared/ui/Button/Button'

type UpdatePostFormProps = {
  t: TFunction<Namespaces, undefined>
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  closeForm?: () => void
}

export const UpdatePostForm: FC<UpdatePostFormProps> = memo(
  ({ t, closeForm, isModalOpen, setIsModalOpen }) => {
    const { id, description } = useSelector(getCurrentPost)
    const [newDescription, setNewDescription] = useState<string>(description)
    const isDescriptionChanged = description !== newDescription
    const [updatePostByIdMutation, { isLoading }] = useUpdatePostByIdMutation()

    const onModalClose = (type: 'keep' | 'exit') =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallback(() => {
        setIsModalOpen(false)
        type === 'exit' && closeForm?.()
      }, [type])

    const keepForm = onModalClose('keep')
    const exitForm = onModalClose('exit')

    const updatePost = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        if (isDescriptionChanged) {
          await updatePostByIdMutation({ description: newDescription, id })
          toast.success(t('toast.success.update'))
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const apiError = error.data as ApiError

          if (Array.isArray(apiError.messages)) {
            toast.error(t('toast.error.update'))
            toast.error(apiError.messages[0].message)
          }
        }
      }
    }

    const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setNewDescription(event.target.value)
    }

    if (isModalOpen && !isDescriptionChanged) {
      setIsModalOpen(false)
      closeForm?.()
    }

    return (
      <>
        <form onSubmit={updatePost}>
          <VStack className={cls.UpdatePostForm} gap="24" max>
            <TextArea
              id="post-details description"
              value={newDescription}
              title={t('edit.descriptionTitle')}
              onChange={onChangeDescription}
              maxLength={500}
              withCounter
            />
            <Button
              className={cls.btn}
              type="submit"
              isLoading={isLoading}
              disabled={isLoading || !isDescriptionChanged}
            >
              {t('edit.btn')}
            </Button>
          </VStack>
        </form>
        {isDescriptionChanged && (
          <PostDetailsConfirmationModal
            t={t}
            title={t('modal.update.title')}
            text={t('modal.update.text')}
            handleClose={keepForm}
            onClick={exitForm}
            isOpen={isModalOpen}
          />
        )}
      </>
    )
  },
)

UpdatePostForm.displayName = 'UpdatePostForm'
