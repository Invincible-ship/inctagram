import { ModalBody } from '@/shared/ui/Modal/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FC, MutableRefObject, useRef } from 'react'
import cls from './SelectImage.module.scss'
import ImageIcon from '@/shared/assets/icons/image-outline.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import toast from 'react-hot-toast'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getAllSteps } from '../../model/selectors/getAllSteps'
import { useSelector } from 'react-redux'
import { ComponentCommonProps } from '../../model/types/types'
import { handleDownloadedImage } from '@/shared/lib/utils/handleDownloadedImage'
import { addCreatePostImageService } from '../../model/services/addCreatePostImageService'
import { openDraftAC } from '../../model/slice/createPostSlice'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { getDraft } from '../../model/selectors/getDraft'
import { classNames } from '@/shared/lib/classNames/classNames'

type SelectImageProps = {}

export const SelectImage: FC<ComponentCommonProps & SelectImageProps> = ({
  toastSizeErrorIdRef,
}) => {
  const { t } = useClientTranslation(Namespaces.CREATE_POST)
  const fileRef = useRef() as MutableRefObject<HTMLInputElement>
  const dispatch = useAppDispatch()
  const { nextStep } = useSelector(getAllSteps)
  const draft = useSelector(getDraft)

  const handleSelectImageClick = () => {
    fileRef?.current?.click()
  }

  const openDraft = () => dispatch(openDraftAC())

  const addCreatePostImage = (file: File) => {
    toast.remove(toastSizeErrorIdRef.current)

    dispatch(addCreatePostImageService({ file, nextStep }))
  }

  const handleImageSizeError = () =>
    (toastSizeErrorIdRef.current = toast.error(t('toasts.sizeError'), { duration: Infinity }))

  return (
    <ModalBody className={cls.content}>
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
            {t('image-selecting.select-btn')}
          </Button>
          {draft && (
            <Button theme={ButtonTheme.OUTLINED} onClick={openDraft} full>
              {t('image-selecting.draft-btn')}
            </Button>
          )}
        </VStack>
      </VStack>
    </ModalBody>
  )
}
