import { useState } from 'react'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import toast from 'react-hot-toast'
import { useDeletePostMutation } from '@/entities/Post'
import { useSelector } from 'react-redux'
import { StateSchema } from '@/providers/StoreProvider'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { setEditMode } from '@/widgets/PostDetails/model/slice/postDetailsSlice'

type Args = {
  onClose: () => void
  id: number
  description: string
}
export const usePostDetails = ({ onClose, id, description }: Args) => {
  const dispatch = useAppDispatch()
  const textValue = useSelector((state: StateSchema) => state.postDetails.textValue)
  const editMode = useSelector((state: StateSchema) => state.postDetails.editMode)
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [remove, { isLoading }] = useDeletePostMutation()

  const handleOpenConfirmationModal = () => {
    if (description !== textValue) {
      setIsOpenConfirmationModal(true)
    } else {
      onClose()
      dispatch(setEditMode(false))
    }
  }
  const onCloseHandler = () => {
    if (editMode) {
      handleOpenConfirmationModal()
    } else {
      onClose()
      dispatch(setEditMode(false))
    }
  }
  const handleCloseConfirmationModal = () => {
    setIsOpenConfirmationModal(false)
  }
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false)
  }

  const onClickCloseHandler = () => {
    onClose()
    setIsOpenConfirmationModal(false)
    dispatch(setEditMode(false))
  }
  const onClickDeleteHandler = async () => {
    try {
      await remove(id)
      onClose()
      setIsOpenConfirmationModal(false)
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

  return {
    isLoading,
    isOpenConfirmationModal,
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    handleCloseConfirmationModal,
    handleOpenConfirmationModal,
    handleCloseDeleteModal,
    onClickCloseHandler,
    onClickDeleteHandler,
    onCloseHandler,
  }
}
