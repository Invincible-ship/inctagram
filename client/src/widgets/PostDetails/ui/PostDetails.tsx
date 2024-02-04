'use client'
import { HStack } from '@/shared/ui/Stack'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Publication } from '../Publication/Publication'
import CloseIcon from '@/shared/assets/icons/close.svg'
import s from '../PostDetails.module.scss'
import { PostHeader } from '../PostHeader/PostHeader'
import { IPost } from '@/entities/Post'
import { PostConfirmationModal } from './PostConfirmationModal/PostConfirmationModal'
import { ImageSwiper } from './ImageSwiper/ImageSwiper'
import { usePostDetails } from '../model/hooks/usePostDetails'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'

type Props = {
  isOpen: boolean
  onClose: () => void
  post: IPost
}
export const PostDetails = ({ isOpen, onClose, post }: Props) => {
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)
  const { avatarOwner, images, description, id, userName } = post
  const {
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
  } = usePostDetails({ onClose, id, description })

  return (
    <Modal className={s.modal} isOpen={isOpen} onClose={onCloseHandler}>
      {editMode && <Modal.Header close={handleOpenConfirmationModal}>{t('editPost')}</Modal.Header>}
      {!editMode && (
        <button type="button" className={s.buttonClose} onClick={onCloseHandler}>
          <CloseIcon />
        </button>
      )}
      <HStack className={s.mainBlock} justify="start">
        <ImageSwiper images={images} />
        <HStack wrap="wrap" justify={'center'}>
          <PostHeader
            userName={userName}
            setIsOpenDeleteModal={setIsOpenDeleteModal}
            avatar={avatarOwner}
            editMode={editMode}
            setEditMode={setEditMode}
          />
          <Publication
            textValue={textValue}
            setTextValue={setTextValue}
            userName={userName}
            description={description}
            id={id}
            avatar={avatarOwner}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        </HStack>
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
