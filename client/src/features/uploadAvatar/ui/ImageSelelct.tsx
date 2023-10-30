import { Namespaces } from '@/shared/config/i18n/types'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import { HStack } from '@/shared/ui/Stack'
import { TFunction } from 'i18next'
import { ChangeEventHandler, RefObject, forwardRef } from 'react'
import ImageIcon from '@/shared/assets/icons/image-outline.svg'
import cls from './ImageSelect.module.scss'

type ImageSelectProps = {
  t: TFunction<Namespaces, undefined>
  onFileInputChange: ChangeEventHandler<HTMLInputElement>
}

export const ImageSelect = forwardRef<HTMLInputElement, ImageSelectProps>(
  ({ t, onFileInputChange }, fileRef) => {
    const onClick = () => (fileRef as RefObject<HTMLInputElement>)?.current?.click()

    return (
      <>
        <HStack className={cls.placeholderBox} align="center" justify="center">
          <ImageIcon width={48} height={48} viewBox="0 0 24 24" />
        </HStack>
        <Input
          type="file"
          style={{ display: 'none' }}
          ref={fileRef}
          onChange={onFileInputChange}
          accept="image/png,image/jpeg"
        />
        <Button className={cls.btn} onClick={onClick} theme={ButtonTheme.DEFAULT}>
          {t('general-info.upload-modal.btn')}
        </Button>
      </>
    )
  },
)

ImageSelect.displayName = 'ImageSelect'
