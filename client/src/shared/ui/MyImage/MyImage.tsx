import NextImage from 'next/image'
import type { ImageProps, StaticImageData } from 'next/image'
import {
  CSSProperties,
  ReactElement,
  forwardRef,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import cls from './MyImage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getDynamicImageStyles } from './utils/getDynamicImageStyles'

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
  wrapperClassName?: string
  variant?: ImageVariant
  filter?: ImageFilter
  scale?: number
  fallback?: ReactElement
  errorFallback?: ReactElement
  ar?: string
} & ImageProps

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
      width,
      height,
      ar,
      alt = 'image',
      ...rest
    } = props
    const [dynamicImageStyles, setDynamicImageStyles] = useState<CSSProperties>()
    const intrinsicWidthRef = useRef<number>(0)
    const intrinsicHeightRef = useRef<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isHasError, setIsHasError] = useState<boolean>(false)

    useLayoutEffect(() => {
      const img = new Image()
      img.src = typeof src != 'string' ? (src as StaticImageData).src : src ?? ''
      img.onload = function () {
        const self = this as HTMLImageElement
        const { width, height } = self

        intrinsicWidthRef.current = width
        intrinsicHeightRef.current = height

        if (variant == ImageVariant.ORIGINAL && filter != ImageFilter.NORMAL) {
          setDynamicImageStyles(getDynamicImageStyles(width, height))
        }

        setIsLoading(false)
      }
      img.onerror = () => {
        setIsLoading(false)
        setIsHasError(true)
      }
    }, [src])

    useEffect(() => {
      if (variant == ImageVariant.ORIGINAL && filter != ImageFilter.NORMAL) {
        setDynamicImageStyles(
          getDynamicImageStyles(intrinsicWidthRef.current, intrinsicHeightRef.current),
        )
      }
    }, [variant, filter])

    if (isLoading) return fallback

    if (isHasError) return errorFallback

    const classes = [cls[variant], cls[filter], 'dynamic-image-styles', wrapperClassName]

    // const shimmerUrl = `data:image/svg+xml;base64,${toBase64(shimmer(wrapperWidth, wrapperHeight))}`

    return (
      <>
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
          <NextImage
            ref={forwardRef}
            className={classNames(cls.NextImage, {}, [cls[variant], className])}
            src={src || ''}
            width={0}
            height={0}
            alt={alt}
            sizes={sizes}
            style={{ scale: scale || '', ...style }}
            {...rest}
          />
        </div>
      </>
    )
  }),
)

MyImage.displayName = 'MyImage'
