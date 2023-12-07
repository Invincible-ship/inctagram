import NextImage from 'next/image'
import type { ImageProps, StaticImageData } from 'next/image'
import { CSSProperties, ReactElement, forwardRef, useLayoutEffect, useRef, useState } from 'react'
import cls from './MyImage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

export enum ImageVariant {
  ORIGINAL = 'original',
  SQUARE = 'square',
  NARROW = 'narrow',
  WIDE = 'wide',
}

export type MyImageProps = {
  variant?: ImageVariant
  fallback?: ReactElement
  errorFallback?: ReactElement
  ar?: string
} & ImageProps

export const MyImage = forwardRef<HTMLImageElement, MyImageProps>((props, forwardRef) => {
  const {
    variant = ImageVariant.ORIGINAL,
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
  const intrinsicWidthRef = useRef<number>()
  const intrinsicHeightRef = useRef<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isHasError, setIsHasError] = useState<boolean>(false)

  useLayoutEffect(() => {
    const img = new Image()
    img.src = typeof src != 'string' ? (src as StaticImageData).src : src ?? ''
    img.onload = function () {
      const width = (this as HTMLImageElement).width
      const height = (this as HTMLImageElement).height

      intrinsicWidthRef.current = width
      intrinsicHeightRef.current = height
      setIsLoading(false)
    }
    img.onerror = () => {
      setIsLoading(false)
      setIsHasError(true)
    }
  }, [src])

  if (isLoading) return fallback

  if (isHasError) return errorFallback

  // const shimmerUrl = `data:image/svg+xml;base64,${toBase64(shimmer(wrapperWidth, wrapperHeight))}`

  return (
    <div
      data-testid="image-wrapper"
      className={cls.wrapper}
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
        style={style}
        {...rest}
      />
    </div>
  )
})

MyImage.displayName = 'MyImage'
