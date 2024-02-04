import { useState } from 'react'
import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import toast from 'react-hot-toast'
import { useDeletePostMutation } from '@/entities/Post'

type Args = {
  onClose: () => void
  id: number
  description: string
}
export const usePostDetails = ({ onClose, id, description }: Args) => {
  const [editMode, setEditMode] = useState(false)
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [textValue, setTextValue] = useState(description)
  const [remove, { isLoading }] = useDeletePostMutation()

  const handleOpenConfirmationModal = () => {
    description !== textValue ? setIsOpenConfirmationModal(true) : onClose()
  }
  const onCloseHandler = () => {
    editMode ? handleOpenConfirmationModal() : onClose()
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
    setEditMode(false)
  }
  const onClickDeleteHandler = async () => {
    try {
      await remove(id)
      onClose()
      setIsOpenConfirmationModal(false)
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

  return {
    isLoading,
    editMode,
    setEditMode,
    isOpenConfirmationModal,
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    handleCloseConfirmationModal,
    handleOpenConfirmationModal,
    handleCloseDeleteModal,
    onClickCloseHandler,
    onClickDeleteHandler,
    onCloseHandler,
    textValue,
    setTextValue,
  }
}
