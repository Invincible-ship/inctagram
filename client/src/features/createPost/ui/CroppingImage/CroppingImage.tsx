import { CreatePostHeader } from '../CreatePostHeader/CreatePostHeader'
import { MyImage } from '@/shared/ui/MyImage/MyImage'
import { useSelector } from 'react-redux'
import cls from './CroppingImage.module.scss'
import { ChangeEvent, FC, MutableRefObject, ReactNode, useRef, useState } from 'react'
import ScaleIcon from '@/shared/assets/icons/maximize-outline.svg'
import ExpandIcon from '@/shared/assets/icons/expand-outline.svg'
import ImageIcon from '@/shared/assets/icons/image-outline.svg'
import CloseIcon from '@/shared/assets/icons/close-outline.svg'
import AddAnotherImageIcon from '@/shared/assets/icons/plus-circle-outline.svg'
import { HStack, VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useCroppingImageTool } from '@/shared/lib/hooks/useCroppingImageTool/useCroppingImageTool'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deletePostImage, setCurrentStep } from '../../model/slice/createPostSlice'
import { getAllSteps } from '../../model/selectors/getAllSteps'
import { getPostImages } from '../../model/selectors/getPostImages'
import { ComponentCommonProps, CreatePostImage } from '../../model/types/types'
import toast from 'react-hot-toast'
import { addCreatePostImageService } from '../../model/services/addCreatePostImageService'
import { handleDownloadedImage } from '@/shared/lib/utils/handleDownloadedImage'
import { Input } from '@/shared/ui/Input/Input'

export const CroppingImage: FC<ComponentCommonProps> = ({ toastSizeErrorIdRef }) => {
  const images = useSelector(getPostImages)
  const [currentImage] = images
  const imageRef = useRef<HTMLImageElement>(null)

  return (
    <div className={cls.CroppingImage}>
      <CreatePostHeader title="Cropping" />
      {currentImage && (
        <>
          <MyImage
            className={cls.image}
            ref={imageRef}
            src={currentImage.src}
            alt="hello"
            width={490}
            height={490}
            style={{ objectFit: 'contain' }}
          />
          <ImageOrientationTool imageRef={imageRef} />
          <ScaleImageTool imageRef={imageRef} />
          <AddAnotherImageTool
            imageRef={imageRef}
            images={images}
            toastSizeErrorIdRef={toastSizeErrorIdRef}
          />
        </>
      )}
    </div>
  )
}

type ScaleImageToolProps = {
  imageRef: MutableRefObject<HTMLImageElement | null>
}

const ScaleImageTool: FC<ScaleImageToolProps> = ({ imageRef }) => {
  const { isActive, handleIconClick, mods } = useCroppingImageTool(cls)
  const [rangeValue, setRangeValue] = useState<number>(100)

  const handleRangeValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    setRangeValue(value)

    if (imageRef.current) {
      imageRef.current.style.setProperty('--scale', `${value / 100}`)
    }
  }

  return (
    <>
      <HStack
        className={classNames(cls.iconWrapper, mods, [cls.scale])}
        align="center"
        justify="center"
      >
        <ScaleIcon onClick={handleIconClick} />
      </HStack>
      {isActive && (
        <HStack align="center" className={cls.ranger}>
          <input
            type="range"
            value={rangeValue}
            onChange={handleRangeValueChange}
            min={100}
            max={200}
          />
        </HStack>
      )}
    </>
  )
}

type ImageOrientationToolProps = {
  imageRef: MutableRefObject<HTMLImageElement | null>
}
type ImageOrientationValue = 'original' | '1 / 1' | '4 / 5' | '16 / 9'
type ImageOrientationItems = {
  value: ImageOrientationValue
  text: string
  icon: ReactNode
}

const ImageOrientationTool: FC<ImageOrientationToolProps> = ({ imageRef }) => {
  const { isActive, handleIconClick, mods } = useCroppingImageTool(cls)
  const [orientation, setOrientation] = useState<ImageOrientationValue>('original')
  const originalOrientationRef = useRef<string>()
  const isFirstClickRef = useRef<boolean>(true)

  const imageOrientationItems: ImageOrientationItems[] = [
    {
      value: 'original',
      text: 'Original',
      icon: <ImageIcon style={{ marginRight: '-3px' }} />,
    },
    { value: '1 / 1', text: '1:1', icon: <OrientationIcon width={18} height={18} /> },
    { value: '4 / 5', text: '4:5', icon: <OrientationIcon width={18} height={26} /> },
    { value: '16 / 9', text: '16:9', icon: <OrientationIcon width={26} height={20} /> },
  ]

  const handleOrientationItemClick = (orientation: ImageOrientationValue) => () => {
    setOrientation(orientation)

    if (imageRef.current) {
      const $imageWrapper = imageRef.current.closest('div') as HTMLDivElement

      if (isFirstClickRef.current) {
        originalOrientationRef.current = $imageWrapper.style.aspectRatio
        isFirstClickRef.current = false
      }

      orientation == 'original'
        ? ($imageWrapper.style.aspectRatio = originalOrientationRef.current as string)
        : ($imageWrapper.style.aspectRatio = orientation)
    }
  }

  return (
    <>
      <HStack
        className={classNames(cls.iconWrapper, mods, [cls.orientation])}
        onClick={handleIconClick}
        align="center"
        justify="center"
      >
        <ExpandIcon />
      </HStack>
      {isActive && (
        <VStack
          className={classNames(cls.imageOrientationContainer, mods)}
          align="stretch"
          justify="start"
          gap="12"
          max
        >
          {imageOrientationItems.map(({ value, text, icon }) => {
            const mods = {
              [cls.orientationActive]: value == orientation,
            }

            return (
              <HStack
                key={value}
                className={classNames(cls.imageOrientationItem, mods)}
                onClick={handleOrientationItemClick(value)}
                align="center"
                justify="between"
                max
              >
                {text}
                {icon}
              </HStack>
            )
          })}
        </VStack>
      )}
    </>
  )
}

type OrientationIconProps = {
  width: number | string
  height: number | string
}

const OrientationIcon: FC<OrientationIconProps> = ({ width, height }) => {
  return <div className={cls.orientationIcon} style={{ width: width, height: height }}></div>
}

type AddAnotherImageToolProps = {
  imageRef: MutableRefObject<HTMLImageElement | null>
  images: CreatePostImage[] | []
  toastSizeErrorIdRef: MutableRefObject<string | undefined>
}

const AddAnotherImageTool: FC<AddAnotherImageToolProps> = ({
  imageRef,
  images,
  toastSizeErrorIdRef,
}) => {
  const fileRef = useRef() as MutableRefObject<HTMLInputElement>
  const { isActive, handleIconClick, mods } = useCroppingImageTool(cls)
  const { previousStep } = useSelector(getAllSteps)
  const dispatch = useAppDispatch()

  const handleSelectImageClick = () => {
    fileRef?.current?.click()
  }

  const deleteImage = (id: number, isLastImage: boolean) => () => {
    dispatch(deletePostImage(id))
    isLastImage && previousStep && dispatch(setCurrentStep(previousStep))
  }

  const addCreatePostImage = (file: File) => {
    toast.remove(toastSizeErrorIdRef.current)

    dispatch(addCreatePostImageService({ file }))
  }

  const handleImageSizeError = () =>
    (toastSizeErrorIdRef.current = toast.error('Size error', { duration: Infinity }))

  return (
    <>
      <HStack
        className={classNames(cls.iconWrapper, mods, [cls.anotherImage])}
        onClick={handleIconClick}
        align="center"
        justify="center"
      >
        <ImageIcon />
      </HStack>
      {isActive && (
        <HStack className={cls.addAnotherImageContainer} align="center" justify="start" gap="12">
          {images?.map(({ src, id }) => {
            const isLastImage = images.length == 1

            return (
              <HStack key={id} className={cls.smallImage}>
                <MyImage src={src} width={80} height={80} alt="Post Image" />
                <HStack
                  className={cls.closeIconWrapper}
                  role="button"
                  onClick={deleteImage(id, isLastImage)}
                  align="center"
                  justify="center"
                >
                  <CloseIcon width={12} height={12} viewBox="0 0 12 12" />
                </HStack>
              </HStack>
            )
          })}
          <HStack
            role="button"
            onClick={handleSelectImageClick}
            align="center"
            justify="center"
            style={{ cursor: 'pointer' }}
          >
            <Input
              ref={fileRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleDownloadedImage(addCreatePostImage, handleImageSizeError)}
              accept="image/png,image/jpeg"
            />
            <AddAnotherImageIcon width={36} height={36} viewBox="0 0 36 36" />
          </HStack>
        </HStack>
      )}
    </>
  )
}
