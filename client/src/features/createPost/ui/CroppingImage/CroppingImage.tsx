import { ImageVariant, MyImage } from '@/shared/ui/MyImage/MyImage'
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
  useRef,
  useState,
  MouseEventHandler,
  useMemo,
  useEffect,
} from 'react'
import ScaleIcon from '@/shared/assets/icons/maximize-outline.svg'
import ExpandIcon from '@/shared/assets/icons/expand-outline.svg'
import ImageIcon from '@/shared/assets/icons/image-outline.svg'
import CloseIcon from '@/shared/assets/icons/close-outline.svg'
import AddAnotherImageIcon from '@/shared/assets/icons/plus-circle-outline.svg'
import { HStack, VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  deletePostImage,
  setCurrentStep,
  setPostImageOrientation,
  setPostImageScale,
} from '../../model/slice/createPostSlice'
import { getAllSteps } from '../../model/selectors/getAllSteps'
import { getPostImages } from '../../model/selectors/getPostImages'
import { ComponentCommonProps, CreatePostImage } from '../../model/types/types'
import toast from 'react-hot-toast'
import { addCreatePostImageService } from '../../model/services/addCreatePostImageService'
import { handleDownloadedImage } from '@/shared/lib/utils/handleDownloadedImage'
import { Input } from '@/shared/ui/Input/Input'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { CroppingImageToolValue } from '@/features/createPost/model/consts/croppingImage'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'

export const CroppingImage: FC<ComponentCommonProps> = ({ toastSizeErrorIdRef }) => {
  const images = useSelector(getPostImages)

  return (
    <div className={cls.CroppingImage}>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        centeredSlides={true}
        navigation
        pagination={{ clickable: true }}
        style={{ width: 490 }}
      >
        {images.map(image => {
          return (
            <SwiperSlide key={image.src}>
              <ImageWithTools
                image={image}
                images={images}
                toastSizeErrorIdRef={toastSizeErrorIdRef}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

type ImageWithToolsProps = {
  image: CreatePostImage
  images: CreatePostImage[] | []
  toastSizeErrorIdRef: MutableRefObject<string | undefined>
}

type TCroppingImageTool = {
  value: CroppingImageToolValue
  ToolComponent: FC<ImageToolProps>
}

const ImageWithTools: FC<ImageWithToolsProps> = memo(({ image, images, toastSizeErrorIdRef }) => {
  const [activeTool, setActiveTool] = useState<CroppingImageToolValue | null>(null)
  const { scale, orientation, filter, src } = image

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
        variant={orientation}
        filter={filter}
        scale={scale}
        src={src}
        alt="Create Post Image"
        width={490}
        height={490}
        quality={50}
        fallback={<Skeleton width={490} height={490} />}
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
            handleIconClick={handleIconClick(value)}
            images={images}
            image={image}
            toastSizeErrorIdRef={toastSizeErrorIdRef}
            setActiveTool={setActiveTool}
          />
        )
      })}
    </>
  )
})

ImageWithTools.displayName = 'ImageWithTools'

type ImageToolProps = {
  isActive: boolean
  mods: {
    [x: string]: boolean
  }
  handleIconClick: MouseEventHandler<HTMLDivElement>
  images: CreatePostImage[] | []
  image: CreatePostImage
  toastSizeErrorIdRef: MutableRefObject<string | undefined>
  setActiveTool: Dispatch<SetStateAction<CroppingImageToolValue | null>>
}

const ScaleImageTool: FC<ImageToolProps> = memo(({ image, isActive, mods, handleIconClick }) => {
  const dispatch = useAppDispatch()
  const { id, scale } = image

  const handleRangeValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const scale = +e.target.value / 100
    dispatch(setPostImageScale({ id, scale }))
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
            value={scale && scale * 100}
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

type ImageOrientationItem = {
  value: ImageVariant
  text: string
  icon: ReactNode
}

const ImageOrientationTool: FC<ImageToolProps> = memo(
  ({ image, isActive, mods, handleIconClick }) => {
    const { t } = useClientTranslation(Namespaces.CREATE_POST)
    const dispatch = useAppDispatch()
    const { id, orientation } = image

    const imageOrientationItems: ImageOrientationItem[] = [
      {
        value: ImageVariant.ORIGINAL,
        text: t('image-cropping.orientation.original'),
        icon: <ImageIcon style={{ marginRight: '-3px' }} />,
      },
      { value: ImageVariant.SQUARE, text: '1:1', icon: <OrientationIcon width={18} height={18} /> },
      { value: ImageVariant.NARROW, text: '4:5', icon: <OrientationIcon width={18} height={26} /> },
      { value: ImageVariant.WIDE, text: '16:9', icon: <OrientationIcon width={26} height={20} /> },
    ]

    const handleOrientationClick = (orientation: ImageVariant) => () => {
      dispatch(setPostImageOrientation({ id, orientation }))
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

    useEffect(() => {
      swiper.slideTo(images.length)
    }, [images.length])

    const handleSelectImageClick = () => {
      fileRef?.current?.click()
    }

    const moveToAnotherSlide = (index: number) => () => {
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

                const mods = {
                  [cls.activeSmallImage]: index == swiper.activeIndex,
                }

                return (
                  <HStack
                    key={id}
                    className={classNames(cls.smallImage, mods)}
                    onClick={moveToAnotherSlide(index)}
                  >
                    <MyImage
                      src={src}
                      width={80}
                      height={80}
                      quality={50}
                      alt="Post Image"
                      fallback={<Skeleton width={80} height={80} />}
                    />
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
