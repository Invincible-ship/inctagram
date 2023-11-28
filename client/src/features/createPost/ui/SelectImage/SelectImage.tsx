import { Modal } from '@/shared/ui/Modal/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FC, MutableRefObject, forwardRef, useId, useRef } from 'react'
import cls from './SelectImage.module.scss'
import ImageIcon from '@/shared/assets/icons/image-outline.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import toast from 'react-hot-toast'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getAllSteps } from '@/features/createPost/model/selectors/getAllSteps'
import { useSelector } from 'react-redux'
import { ComponentCommonProps } from '../../model/types/types'
import { handleDownloadedImage } from '@/shared/lib/utils/handleDownloadedImage'
import { addCreatePostImageService } from '../../model/services/addCreatePostImageService'

type SelectImageProps = {}

export const SelectImage: FC<ComponentCommonProps & SelectImageProps> = ({
  onClose,
  toastSizeErrorIdRef,
}) => {
  const fileRef = useRef() as MutableRefObject<HTMLInputElement>
  const dispatch = useAppDispatch()
  const { nextStep } = useSelector(getAllSteps)

  const handleSelectImageClick = () => {
    fileRef?.current?.click()
  }

  const addCreatePostImage = (file: File) => {
    toast.remove(toastSizeErrorIdRef.current)

    dispatch(addCreatePostImageService({ file, nextStep }))
  }

  const handleImageSizeError = () =>
    (toastSizeErrorIdRef.current = toast.error('Size error', { duration: Infinity }))

  return (
    <>
      <Modal.Header close={onClose}>Add Photo</Modal.Header>
      <Modal.Body className={cls.content}>
        <VStack align="center" gap="36">
          <HStack className={cls.imgPlaceholder} align="center" justify="center">
            <ImageIcon width={36} height={36} viewBox="0 0 24 24" />
          </HStack>
          <VStack align="stretch" gap="12">
            <Input
              ref={fileRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleDownloadedImage(addCreatePostImage, handleImageSizeError)}
              accept="image/png,image/jpeg"
            />
            <Button theme={ButtonTheme.DEFAULT} onClick={handleSelectImageClick} full>
              Select from Computer
            </Button>
            <Button theme={ButtonTheme.OUTLINED} full>
              Open Draft
            </Button>
          </VStack>
        </VStack>
      </Modal.Body>
    </>
  )
}
