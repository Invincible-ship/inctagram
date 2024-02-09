'use client'
import { HStack } from '@/shared/ui/Stack'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Publication } from '@/widgets/PostDetails/ui/Publication/Publication'
import CloseIcon from '@/shared/assets/icons/close.svg'
import s from './PostDetails.module.scss'
import { PostHeader } from '@/widgets/PostDetails/ui/PostHeader/PostHeader'
import { IPost } from '@/entities/Post'
import { PostConfirmationModal } from './PostConfirmationModal/PostConfirmationModal'
import { ImageSwiper } from './ImageSwiper/ImageSwiper'
import { usePostDetails } from '../model/hooks/usePostDetails'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { useSelector } from 'react-redux'
import { StateSchema } from '@/providers/StoreProvider'

type Props = {
  isOpen: boolean
  onClose: () => void
  post: IPost
}
export const PostDetails = ({ isOpen, onClose, post }: Props) => {
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)
  const { avatarOwner, images, description, id, userName } = post
  const editMode = useSelector((state: StateSchema) => state.postDetails.editMode)
  const {
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
  } = usePostDetails({ onClose, id, description })

  return (
    <Modal className={s.modal} isOpen={isOpen} onClose={onCloseHandler} withoutAnimation>
      {editMode && <Modal.Header close={handleOpenConfirmationModal}>{t('editPost')}</Modal.Header>}
      {!editMode && (
        <button type="button" className={s.buttonClose} onClick={onCloseHandler}>
          <CloseIcon />
        </button>
      )}
      <HStack className={s.mainBlock} justify="start">
        <ImageSwiper images={images} />
        <div className={s.descriptionContainer}>
          <PostHeader
            userName={userName}
            setIsOpenDeleteModal={setIsOpenDeleteModal}
            avatar={avatarOwner}
            description={description}
          />
          <Publication post={post} />
        </div>
        <PostConfirmationModal
          t={t}
          isOpen={isOpenConfirmationModal}
          handleClose={handleCloseConfirmationModal}
          onClick={onClickCloseHandler}
          title={t('modal.closeTitle')}
          text={t('modal.closeText')}
        />
        <PostConfirmationModal
          t={t}
          isLoading={isLoading}
          isOpen={isOpenDeleteModal}
          handleClose={handleCloseDeleteModal}
          onClick={onClickDeleteHandler}
          title={t('modal.deleteTitle')}
          text={t('modal.deleteText')}
        />
      </HStack>
    </Modal>
  )
}
