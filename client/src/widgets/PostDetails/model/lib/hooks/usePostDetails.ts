import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { setEditMode } from '../../slice/postDetailsSlice'
import { getEditMode } from '../../selectors/getEditMode'
import { getIsPostBeingDeleted } from '../../selectors/getIsPostBeingDeleted'
import { deletePostThunk } from '@/features/post/deletePost'
import { Namespaces } from '@/shared/config/i18n/types'
import { TFunction } from 'i18next'
import { getCurrentPost } from '../../selectors/getCurrentPost'

type Args = {
  postId: string
  onClose?: () => void
  t: TFunction<Namespaces, undefined>
}

export const usePostDetails = ({ postId, onClose, t }: Args) => {
  const [editPostModalOpen, setEditPostModalOpen] = useState<boolean>(false)
  const [deletePostModalOpen, setDeletePostModalOpen] = useState<boolean>(false)
  const isPostBeingDeleted = useSelector(getIsPostBeingDeleted)
  const { id } = useSelector(getCurrentPost(postId))
  const editMode = useSelector(getEditMode)
  const dispatch = useAppDispatch()

  const onPostDetailsClose = () => {
    if (editMode) {
      setEditPostModalOpen(true)
    } else {
      onClose?.()
    }
  }

  const onEditModeClose = () => {
    setEditPostModalOpen(true)
  }

  const exitFromEditMode = useCallback(() => {
    dispatch(setEditMode(false))
  }, [dispatch])

  const openDeletePostModal = useCallback(() => {
    setDeletePostModalOpen(true)
  }, [])

  const closeDeletePostModal = useCallback(() => {
    setDeletePostModalOpen(false)
  }, [])

  const deletePost = useCallback(async () => {
    try {
      await dispatch(deletePostThunk(id)).unwrap()
      toast.success(t('toast.success.delete'))
      onClose?.()
    } catch (err) {
      if (err) toast.error(err as string)
      toast.error(t('toast.error.delete'))
    }
  }, [dispatch, t, id, onClose])

  return {
    isPostBeingDeleted,
    editPostModalOpen,
    deletePostModalOpen,
    editMode,
    onPostDetailsClose,
    onEditModeClose,
    exitFromEditMode,
    setEditPostModalOpen,
    openDeletePostModal,
    closeDeletePostModal,
    deletePost,
  }
}
