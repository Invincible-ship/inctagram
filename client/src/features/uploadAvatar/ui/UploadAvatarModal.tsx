import { Namespaces } from '@/shared/config/i18n/types'
import { Modal } from '@/shared/ui/Modal/Modal'
import { TFunction } from 'i18next'
import {
  ChangeEventHandler,
  Dispatch,
  FC,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useRef,
} from 'react'
import cls from './UploadAvatarModal.module.scss'
import { VStack } from '@/shared/ui/Stack'
import { ImageSelect } from './ImageSelelct'
import { file2Base64 } from '@/shared/utils/file2Base64'
import { ReactCropperElement } from 'react-cropper'
import { CropperImage } from './CropperImage'
import toast from 'react-hot-toast'
import { LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'
import { setProfileAvatars, useUpdateProfileAvatarsMutation } from '@/entities/Profile'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { handleDownloadedImage } from '@/shared/lib/utils/handleDownloadedImage'

type UploadAvatarModalProps = {
  isOpen: boolean
  onClose: () => void
  t: TFunction<Namespaces, undefined>
  toastSizeErrorIdRef: MutableRefObject<string | undefined>
  uploaded: string | undefined
  setUploaded: Dispatch<SetStateAction<string | undefined>>
}

export const UploadAvatarModal: FC<UploadAvatarModalProps> = ({
  isOpen,
  onClose,
  t,
  toastSizeErrorIdRef,
  uploaded,
  setUploaded,
}) => {
  const fileRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>
  const cropperRef = useRef<ReactCropperElement>() as RefObject<ReactCropperElement>
  const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY) as string
  const dispatch = useAppDispatch()

  const [updateAvatars, { isLoading }] = useUpdateProfileAvatarsMutation()

  const handleImage = (file: File) => {
    toast.remove(toastSizeErrorIdRef.current)
    file2Base64(file).then(base64 => setUploaded(base64))
  }

  const handleImageSizeError = () =>
    (toastSizeErrorIdRef.current = toast.error(t('general-info.upload-modal.errors.size'), {
      duration: Infinity,
    }))

  const uploadAvatars = async (blob: Blob) => {
    const formData = new FormData()
    formData.append('file', blob)

    try {
      await updateAvatars({ formData, id: userId }).unwrap()

      onClose()
    } catch (err) {
      toast.error('Something went wrong, please try again...')
      console.log('Upload avatar error: ', err)
    }
  }

  const onCrop = () => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper

    cropper.getCroppedCanvas().toBlob(uploadAvatars)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={432}>
      <Modal.Header close={onClose}>{t('general-info.upload-modal.title')}</Modal.Header>
      <VStack className={cls.body} align="center" gap="24">
        {uploaded ? (
          <CropperImage
            isLoading={isLoading}
            ref={cropperRef}
            onCrop={onCrop}
            uploaded={uploaded}
            t={t}
          />
        ) : (
          <ImageSelect
            ref={fileRef}
            onFileInputChange={handleDownloadedImage(handleImage, handleImageSizeError)}
            t={t}
          />
        )}
      </VStack>
    </Modal>
  )
}
