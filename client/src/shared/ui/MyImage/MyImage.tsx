import NextImage from 'next/image'
import type { ImageProps } from 'next/image'
import {
  CSSProperties,
  ReactElement,
  SyntheticEvent,
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import cls from './MyImage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getDynamicImageStyles } from './utils/getDynamicImageStyles'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

export enum ImageFilter {
  NORMAL = 'normal',
  CLARENDON = 'clarendon',
  LARK = 'lark',
  GINGHAM = 'gingham',
  MOON = 'moon',
  ADEN = 'aden',
  BRANNAN = 'brannan',
  INKWELL = 'inkwell',
  REYES = 'reyes',
}

export enum ImageVariant {
  ORIGINAL = 'original',
  SQUARE = 'square',
  NARROW = 'narrow',
  WIDE = 'wide',
}

export type MyImageProps = {
  width?: string | number
  height?: string | number
  wrapperClassName?: string
  variant?: ImageVariant
  filter?: ImageFilter
  scale?: number
  fallback?: ReactElement
  errorFallback?: ReactElement
  ar?: string
} & Omit<ImageProps, 'width' | 'height'>

export const MyImage = memo(
  forwardRef<HTMLImageElement, MyImageProps>((props, forwardRef) => {
    const {
      wrapperClassName,
      variant = ImageVariant.ORIGINAL,
      filter = ImageFilter.NORMAL,
      scale,
      className,
      src,
      fallback,
      errorFallback,
      sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      style,
      width = '100%',
      height = '100%',
      ar,
      alt = 'image',
      ...rest
    } = props
    const [dynamicImageStyles, setDynamicImageStyles] = useState<CSSProperties>()
    const intrinsicWidthRef = useRef<number>(0)
    const intrinsicHeightRef = useRef<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isHasError, setIsHasError] = useState<boolean>(false)

    useEffect(() => {
      if (variant == ImageVariant.ORIGINAL && filter != ImageFilter.NORMAL) {
        setDynamicImageStyles(
          getDynamicImageStyles(intrinsicWidthRef.current, intrinsicHeightRef.current),
        )
      }
    }, [variant, filter])

    function onLoad(e: SyntheticEvent<HTMLImageElement>) {
      const self = e.currentTarget
      const { naturalWidth, naturalHeight } = self

      intrinsicWidthRef.current = naturalWidth
      intrinsicHeightRef.current = naturalHeight

      if (variant == ImageVariant.ORIGINAL && filter != ImageFilter.NORMAL) {
        setDynamicImageStyles(getDynamicImageStyles(naturalWidth, naturalHeight))
      }
    }

    function onError() {
      setIsLoading(false)
      setIsHasError(true)
    }

    const dynamicStyles = useMemo(
      () => (
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .dynamic-image-styles::before, .dynamic-image-styles::after {
              inset: ${dynamicImageStyles?.inset};
              width: ${dynamicImageStyles?.width};
              height: ${dynamicImageStyles?.height};
              scale: ${scale};
            }
          `,
          }}
        ></style>
      ),
      [dynamicImageStyles, scale],
    )

    if (isHasError) return errorFallback

    const classes = [cls[variant], cls[filter], 'dynamic-image-styles', wrapperClassName]

    return (
      <div
        data-testid="image-wrapper"
        className={classNames(cls.wrapper, {}, classes)}
        style={{
          maxWidth: width,
          width: width && '100%',
          height: height,
          aspectRatio: ar || `${intrinsicWidthRef.current} / ${intrinsicHeightRef.current}`,
        }}
      >
        {dynamicStyles}
        <NextImage
          ref={forwardRef}
          className={classNames(cls.NextImage, {}, [cls[variant], className])}
          src={src || ''}
          width={0}
          height={0}
          alt={alt}
          sizes={sizes}
          style={{ scale: scale || '', ...style }}
          onLoad={onLoad}
          onLoadingComplete={() => setIsLoading(false)}
          onError={onError}
          {...rest}
        />
        {isLoading && <Skeleton style={{ position: 'absolute', inset: 0 }} className={className} />}
      </div>
    )
  }),
)

MyImage.displayName = 'MyImage'
