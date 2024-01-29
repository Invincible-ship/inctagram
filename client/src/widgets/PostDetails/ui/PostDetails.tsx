'use client'
import cls from '@/features/createPost/ui/FilteringImage/FilteringImage.module.scss'
import { HStack } from '@/shared/ui/Stack'
import React, { useState } from 'react'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Publication } from '@/widgets/PostDetails/ui/Publication/Publication'
import { ImageSwiper } from '@/features/createPost/ui/FilteringImage/FilteringImage'
import CloseIcon from '@/shared/assets/icons/close.svg'
import s from './PostDetails.module.scss'
import { PostHeader } from '@/widgets/PostDetails/ui/PostHeader/PostHeader'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

const images: any[] = [
  {
    filter: 'normal',
    id: 1706002415714,
    orientation: 'original',
    scale: 1,
    src: 'https://www.ixbt.com/img/n1/news/2021/10/2/22459ff25f8eff76bddf34124cc2c85b16f4cd4a_large.jpg',
  },
  {
    filter: 'normal',
    id: 1706002415715,
    orientation: 'original',
    scale: 1,
    src: 'https://www.ixbt.com/img/n1/news/2021/10/2/22459ff25f8eff76bddf34124cc2c85b16f4cd4a_large.jpg',
  },
]

type Props = {
  isOpen: boolean
  onClose: () => void
}
export const PostDetails = ({ isOpen, onClose }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [isOpenConfirmationModal, setIsOpenModalConfirmationModal] = useState(false)
  const onCloseHandler = () => {
    editMode ? setIsOpenModalConfirmationModal(true) : onClose()
  }
  const setIsOpenModalConfirmationModalHandler = () => {}
  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler}>
      {editMode && (
        <Modal.Header
          close={() => {
            setIsOpenModalConfirmationModal(true)
          }}
        >
          Edit Post
        </Modal.Header>
      )}
      {!editMode && (
        <button type="button" className={s.buttonClose} onClick={onCloseHandler}>
          <CloseIcon />
        </button>
      )}
      <HStack className={cls.FilteringImage} justify="start">
        <ImageSwiper images={images} />
        <HStack className={s.post} wrap="wrap" justify={'center'}>
          <PostHeader editMode={editMode} setEditMode={setEditMode} />
          <Publication setEditMode={setEditMode} editMode={editMode} />
        </HStack>
      </HStack>
      <Modal
        onClose={() => setIsOpenModalConfirmationModal(false)}
        isOpen={isOpenConfirmationModal}
      >
        <Modal.Header close={() => setIsOpenModalConfirmationModal(false)}>
          {'modal.title'}
        </Modal.Header>
        <Modal.Body>
          <div>
            <span>Are you sure you want to delete this post?</span>
            <Button
              theme={ButtonTheme.DEFAULT}
              onClick={() => {
                onClose()
                setIsOpenModalConfirmationModal(false)
                setEditMode(false)
              }}
            >
              Yes
            </Button>
            <Button
              theme={ButtonTheme.DEFAULT}
              onClick={() => setIsOpenModalConfirmationModal(false)}
            >
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Modal>
  )
}
