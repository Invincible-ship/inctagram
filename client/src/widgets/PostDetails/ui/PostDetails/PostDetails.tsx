'use client'

import { HStack, VStack } from '@/shared/ui/Stack'
import { Modal, ModalHeader } from '@/shared/ui/Modal/Modal'
import CloseIcon from '@/shared/assets/icons/close.svg'
import cls from './PostDetails.module.scss'
import { PostHeader } from '@/widgets/PostDetails/ui/PostHeader/PostHeader'
import { ImageSwiper } from '../ImageSwiper/ImageSwiper'
import { usePostDetails } from '../../model/lib/hooks/usePostDetails'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { UpdatePostForm } from '@/features/post/updatePostById'
import { PostDetailsConfirmationModal } from '@/entities/Post'
import { PublicationDescription } from '../PublicationDescription/PublicationDescription'

type PostDetailsProps = {
  isOpen: boolean
  onClose: () => void
}

export const PostDetails = ({ isOpen, onClose }: PostDetailsProps) => {
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)
  const {
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
  } = usePostDetails({ onClose, t })

  return (
    <Modal className={cls.modal} isOpen={isOpen} onClose={onPostDetailsClose} withoutAnimation>
      {editMode ? (
        <ModalHeader close={onEditModeClose}>{t('editPost')}</ModalHeader>
      ) : (
        <HStack role="button" className={cls.buttonClose} onClick={onPostDetailsClose}>
          <CloseIcon />
        </HStack>
      )}
      <HStack className={cls.mainBlock} justify="start">
        <ImageSwiper />
        <VStack className={cls.rightBlock} max>
          <PostHeader openDeletePostModal={openDeletePostModal} />
          {editMode ? (
            <UpdatePostForm
              isModalOpen={editPostModalOpen}
              setIsModalOpen={setEditPostModalOpen}
              t={t}
              closeForm={exitFromEditMode}
            />
          ) : (
            <PublicationDescription t={t} />
          )}
        </VStack>
        <PostDetailsConfirmationModal
          t={t}
          isLoading={isPostBeingDeleted}
          isOpen={deletePostModalOpen}
          handleClose={closeDeletePostModal}
          onClick={deletePost}
          title={t('modal.delete.title')}
          text={t('modal.delete.text')}
        />
      </HStack>
    </Modal>
  )
}
