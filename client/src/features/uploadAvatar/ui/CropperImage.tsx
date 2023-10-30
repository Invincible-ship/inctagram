import Cropper, { ReactCropperElement } from 'react-cropper'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css'
import { forwardRef } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import cls from './CropperImage.module.scss'

type CropperImageProps = {
  onCrop: () => void
  isLoading?: boolean
  uploaded: string | undefined
  cropped?: string | null
  t: TFunction<Namespaces, undefined>
}

export const CropperImage = forwardRef<ReactCropperElement, CropperImageProps>(
  ({ onCrop, isLoading, uploaded, t }, cropperRef) => {
    return (
      <>
        <style>
          {`
            .cropper-crop-box, .cropper-view-box {
              border-radius: 50%;
            .btn {
              @media (max-width: 769px) {
                width: 100%;
              }
            }
          `}
        </style>
        <Cropper
          src={uploaded}
          style={{ width: '100%', height: 360 }}
          autoCropArea={1}
          initialAspectRatio={1}
          aspectRatio={1}
          viewMode={3}
          guides={false}
          ref={cropperRef}
        />
        <Button className={cls.btn} onClick={onCrop} disabled={isLoading} isLoading={isLoading}>
          {t('general-info.upload-modal.cropper-btn')}
        </Button>
      </>
    )
  },
)

CropperImage.displayName = 'CropperImage'
