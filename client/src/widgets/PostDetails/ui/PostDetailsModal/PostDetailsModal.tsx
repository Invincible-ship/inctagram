'use client'

import { HStack, VStack } from '@/shared/ui/Stack'
import { Modal, ModalHeader } from '@/shared/ui/Modal/Modal'
import CloseIcon from '@/shared/assets/icons/close.svg'
import cls from './PostDetailsModal.module.scss'
import { PostHeader } from '@/widgets/PostDetails/ui/PostHeader/PostHeader'
import { ImageSwiper } from '../ImageSwiper/ImageSwiper'
import { usePostDetails } from '../../model/lib/hooks/usePostDetails'
import { Namespaces } from '@/shared/config/i18n/types'
import { UpdatePostForm } from '@/features/post/updatePostById'
import { PostDetailsConfirmationModal } from '@/entities/Post'
import { PublicationDescription } from '../PublicationDescription/PublicationDescription'
import { TFunction } from 'i18next'
import { Portal } from '@/shared/ui/Portal/Portal'
import { Overlay } from '@/shared/ui/Overlay/Overlay'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Suspense } from 'react'
import { PostDetailsVariant } from '@/widgets/PostDetails/model/consts/variant'
import { getCurrentPost } from '@/widgets/PostDetails/model/selectors/getCurrentPost'
import { useSelector } from 'react-redux'

type PostDetailsModalProps = {
  postId: string
  t: TFunction<Namespaces, undefined>
  isOpen?: boolean
  onClose?: () => void
}

export const PostDetailsModal = ({ isOpen, onClose, t, postId }: PostDetailsModalProps) => {
  const { description } = useSelector(getCurrentPost(postId))
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
    <Suspense fallback={<PostDetailsModalSkeleton />}>
      <Modal className={cls.modal} isOpen={isOpen} onClose={onPostDetailsClose} withoutAnimation>
        {editMode ? (
          <ModalHeader close={onEditModeClose}>{t('editPost')}</ModalHeader>
        ) : (
          <HStack role="button" className={cls.buttonClose} onClick={onPostDetailsClose}>
            <CloseIcon />
          </HStack>
        )}
        <HStack className={cls.mainBlock} justify="start">
          <ImageSwiper postId={postId} />
          <VStack className={cls.rightBlock} max>
            <div
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <PostHeader
                postId={postId}
                variant={PostDetailsVariant.MODAL}
                openDeletePostModal={openDeletePostModal}
              />
              {editMode ? (
                <UpdatePostForm
                  id={+postId}
                  description={description}
                  isModalOpen={editPostModalOpen}
                  setIsModalOpen={setEditPostModalOpen}
                  t={t}
                  closeForm={exitFromEditMode}
                />
              ) : (
                <PublicationDescription postId={postId} variant={PostDetailsVariant.MODAL} t={t} />
              )}
            </div>
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
    </Suspense>
  )
}

export const PostDetailsModalSkeleton = () => (
  <Portal>
    <div className={cls.mainSkeleton}>
      <Overlay />
      <HStack className={cls.container}>
        <HStack className={cls.content} max>
          <HStack className={cls.padding} max>
            <Skeleton width="100%" height="520px" border="10px" />
          </HStack>
          <VStack max>
            <HStack className={classNames(cls.header, {}, [cls.padding])} max>
              <Skeleton width="100%" height="50px" border="10px" />
            </HStack>
            <HStack className={cls.padding} max>
              <Skeleton width="100%" height="440px" border="10px" />
            </HStack>
          </VStack>
        </HStack>
      </HStack>
    </div>
  </Portal>
)
