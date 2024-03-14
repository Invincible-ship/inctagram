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
import { useRouter, useSearchParams } from 'next/navigation'
import { POST_DETAILS_ID } from '@/widgets/PostList'

type Args = {
  t: TFunction<Namespaces, undefined>
}

export const usePostDetails = ({ t }: Args) => {
  const router = useRouter()
  const sp = useSearchParams()
  const postId = sp.get(POST_DETAILS_ID) as string
  const [editPostModalOpen, setEditPostModalOpen] = useState<boolean>(false)
  const [deletePostModalOpen, setDeletePostModalOpen] = useState<boolean>(false)
  const isPostBeingDeleted = useSelector(getIsPostBeingDeleted)
  const editMode = useSelector(getEditMode)
  const dispatch = useAppDispatch()

  const closePostDetails = useCallback(() => {
    const editableSP = new URLSearchParams(Array.from(sp))
    editableSP.delete(POST_DETAILS_ID)
    router.push(`?${editableSP.toString()}`)
  }, [sp, router])

  const onPostDetailsClose = () => {
    if (editMode) {
      setEditPostModalOpen(true)
    } else {
      closePostDetails()
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
      await dispatch(deletePostThunk(+postId)).unwrap()
      toast.success(t('toast.success.delete'))
      closePostDetails()
    } catch (err) {
      if (err) toast.error(err as string)
      toast.error(t('toast.error.delete'))
    }
  }, [dispatch, t, postId, closePostDetails])

  return {
    isPostBeingDeleted,
    editPostModalOpen,
    deletePostModalOpen,
    editMode,
    closePostDetails,
    onPostDetailsClose,
    onEditModeClose,
    exitFromEditMode,
    setEditPostModalOpen,
    openDeletePostModal,
    closeDeletePostModal,
    deletePost,
    postId,
    isOpen: !!postId,
  }
}
