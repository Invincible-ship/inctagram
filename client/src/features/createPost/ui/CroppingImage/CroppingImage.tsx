import { CreatePostHeader } from '../CreatePostHeader/CreatePostHeader'
import { MyImage } from '@/shared/ui/MyImage/MyImage'
import { useSelector } from 'react-redux'
import cls from './CroppingImage.module.scss'
import {
  ChangeEvent,
  Dispatch,
  FC,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEventHandler,
} from 'react'
import ScaleIcon from '@/shared/assets/icons/maximize-outline.svg'
import ExpandIcon from '@/shared/assets/icons/expand-outline.svg'
import ImageIcon from '@/shared/assets/icons/image-outline.svg'
import CloseIcon from '@/shared/assets/icons/close-outline.svg'
import AddAnotherImageIcon from '@/shared/assets/icons/plus-circle-outline.svg'
import { HStack, VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deletePostImage, setCurrentStep } from '../../model/slice/createPostSlice'
import { getAllSteps } from '../../model/selectors/getAllSteps'
import { getPostImages } from '../../model/selectors/getPostImages'
import { ComponentCommonProps, CreatePostImage, OrientationValue } from '../../model/types/types'
import toast from 'react-hot-toast'
import { addCreatePostImageService } from '../../model/services/addCreatePostImageService'
import { handleDownloadedImage } from '@/shared/lib/utils/handleDownloadedImage'
import { Input } from '@/shared/ui/Input/Input'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import './swiper.scss'
import { ImageOrientation } from '../../model/lib/croppingImage/ImageOrientation'
import { CroppingImageToolValue } from '@/features/createPost/model/consts/croppingImage'

export const CroppingImage: FC<ComponentCommonProps> = ({ toastSizeErrorIdRef }) => {
  const images = useSelector(getPostImages)

  return (
    <div className={cls.CroppingImage}>
      <CreatePostHeader title="Cropping" />
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        centeredSlides={true}
        navigation
        pagination={{ clickable: true }}
        style={{ width: 490 }}
      >
        {images.map(({ src }) => {
          return (
            <SwiperSlide key={src}>
              <ImageWithTools src={src} images={images} toastSizeErrorIdRef={toastSizeErrorIdRef} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

type ImageWithToolsProps = {
  src: string
  images: CreatePostImage[] | []
  toastSizeErrorIdRef: MutableRefObject<string | undefined>
}

type TCroppingImageTool = {
  value: CroppingImageToolValue
  ToolComponent: FC<ImageToolProps>
}

const ImageWithTools: FC<ImageWithToolsProps> = ({ src, images, toastSizeErrorIdRef }) => {
  const imageRef = useRef() as MutableRefObject<HTMLImageElement>
  const [activeTool, setActiveTool] = useState<CroppingImageToolValue | null>(null)

  const handleIconClick = useCallback(
    (value: CroppingImageToolValue): MouseEventHandler<HTMLDivElement> =>
      e =>
        value == activeTool ? setActiveTool(null) : setActiveTool(value),
    [activeTool],
  )

  const croppingImageTools: TCroppingImageTool[] = [
    { value: CroppingImageToolValue.SCALE, ToolComponent: ScaleImageTool },
    { value: CroppingImageToolValue.ORIENTATION, ToolComponent: ImageOrientationTool },
    { value: CroppingImageToolValue.ADD_ANOTHER_IMAGE, ToolComponent: AddAnotherImageTool },
  ]

  return (
    <>
      <MyImage
        className={cls.image}
        ref={imageRef}
        src={src}
        alt="Post Image"
        width={490}
        height={490}
      />
      <div className={cls.overlay} onClick={() => setActiveTool(null)}></div>

      {croppingImageTools.map(({ value, ToolComponent }) => {
        const isActive = value == activeTool

        const mods = {
          [cls.active]: isActive,
        }

        return (
          <ToolComponent
            key={value}
            isActive={isActive}
            mods={mods}
            imageRef={imageRef}
            handleIconClick={handleIconClick(value)}
            images={images}
            toastSizeErrorIdRef={toastSizeErrorIdRef}
            setActiveTool={setActiveTool}
          />
        )
      })}
    </>
  )
}

type ImageToolProps = {
  isActive: boolean
  mods: {
    [x: string]: boolean
  }
  imageRef: MutableRefObject<HTMLImageElement | undefined>
  handleIconClick: MouseEventHandler<HTMLDivElement>
  images: CreatePostImage[] | []
  toastSizeErrorIdRef: MutableRefObject<string | undefined>
  setActiveTool: Dispatch<SetStateAction<CroppingImageToolValue | null>>
}

const ScaleImageTool: FC<ImageToolProps> = memo(({ imageRef, isActive, mods, handleIconClick }) => {
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
        onClick={handleIconClick}
      >
        <ScaleIcon />
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
})

ScaleImageTool.displayName = 'ScaleImageTool'

type ImageOrientationItems = {
  value: OrientationValue
  text: string
  icon: ReactNode
}

const ImageOrientationTool: FC<ImageToolProps> = memo(
  ({ imageRef, isActive, mods, handleIconClick }) => {
    const [orientation, setOrientation] = useState<OrientationValue>('original')
    const imageOrientataionRef = useRef(null) as MutableRefObject<ImageOrientation | null>

    useEffect(() => {
      if (imageRef.current) imageOrientataionRef.current = new ImageOrientation(imageRef.current)
    }, [imageRef.current])

    const imageOrientationItems: ImageOrientationItems[] = [
      {
        value: 'original',
        text: 'Original',
        icon: <ImageIcon style={{ marginRight: '-3px' }} />,
      },
      { value: 'square', text: '1:1', icon: <OrientationIcon width={18} height={18} /> },
      { value: 'narrow', text: '4:5', icon: <OrientationIcon width={18} height={26} /> },
      { value: 'wide', text: '16:9', icon: <OrientationIcon width={26} height={20} /> },
    ]

    const handleOrientationClick = (orientation: OrientationValue) => () => {
      setOrientation(orientation)

      imageOrientataionRef.current && imageOrientataionRef.current.setOrientation(orientation)
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
                  onClick={handleOrientationClick(value)}
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
  },
)

ImageOrientationTool.displayName = 'ImageOrientationTool'

type OrientationIconProps = {
  width: number | string
  height: number | string
}

const OrientationIcon: FC<OrientationIconProps> = ({ width, height }) => {
  return <div className={cls.orientationIcon} style={{ width: width, height: height }}></div>
}

const AddAnotherImageTool: FC<ImageToolProps> = memo(
  ({ isActive, mods, handleIconClick, images, toastSizeErrorIdRef, setActiveTool }) => {
    const fileRef = useRef() as MutableRefObject<HTMLInputElement>
    const { previousStep } = useSelector(getAllSteps)
    const dispatch = useAppDispatch()
    const swiper = useSwiper()

    const handleSelectImageClick = () => {
      fileRef?.current?.click()
    }

    const moveToNewSlide = (index: number) => () => {
      setActiveTool(null)
      swiper.slideTo(index)
    }

    const deleteImage = (id: number, isLastImage: boolean) => () => {
      dispatch(deletePostImage(id))
      isLastImage && previousStep && dispatch(setCurrentStep(previousStep))
    }

    const addAnotherImage = (file: File) => {
      toast.remove(toastSizeErrorIdRef.current)

      dispatch(addCreatePostImageService({ file }))

      setActiveTool(null)
      setTimeout(() => {
        swiper.slideTo(images.length)
      }, 200)
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
            <HStack className={cls.smallImageContainer} align="center" justify="center" gap="12">
              {images?.map(({ src, id }, index) => {
                const isLastImage = images.length == 1

                return (
                  <HStack key={id} className={cls.smallImage} onClick={moveToNewSlide(index)}>
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
            </HStack>
            <HStack
              role="button"
              className={cls.addAnotherImageIcon}
              onClick={handleSelectImageClick}
              align="center"
              justify="center"
              style={{ cursor: 'pointer' }}
            >
              <Input
                ref={fileRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleDownloadedImage(addAnotherImage, handleImageSizeError)}
                accept="image/png,image/jpeg"
              />
              <AddAnotherImageIcon width={36} height={36} viewBox="0 0 36 36" />
            </HStack>
          </HStack>
        )}
      </>
    )
  },
)

AddAnotherImageTool.displayName = 'AddAnotherImageTool'
