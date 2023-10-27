import NextImage from 'next/image'
import type { ImageProps } from 'next/image'
import { CSSProperties, FC, ReactElement, useLayoutEffect, useState } from 'react'
import cls from './MyImage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

const defaultStyles: CSSProperties = {
  objectFit: 'cover',
}

export type MyImageProps = {
  fallback?: ReactElement
  errorFallback?: ReactElement
  ar?: string
} & ImageProps

export const MyImage: FC<MyImageProps> = props => {
  const {
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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isHasError, setIsHasError] = useState<boolean>(false)

  useLayoutEffect(() => {
    const img = new Image()
    // @ts-ignore
    img.src = src ?? ''
    img.onload = () => {
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
      className={classNames(cls.wrapper, {}, [className])}
      style={{ width: width, height: height, aspectRatio: ar }}
    >
      <NextImage
        {...rest}
        src={src || ''}
        alt={alt}
        fill
        sizes={sizes}
        style={{ ...defaultStyles, ...style }}
      />
    </div>
  )
}
