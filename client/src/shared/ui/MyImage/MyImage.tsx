import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { CSSProperties, FC } from 'react'
import cls from './MyImage.module.scss'
import { toBase64 } from '@/shared/utils/toBase64'
import { shimmer, normalizeImageProps } from './utils'
import { classNames } from '@/shared/lib/classNames/classNames'

const defaultStyles: CSSProperties = {
  objectFit: 'cover',
  height: 'auto',
}

export type MyImageProps = {
  src: string
  className?: string
  wrapperWidth?: number
  wrapperHeight?: number
  ar?: string
} & ImageProps

export const MyImage: FC<MyImageProps> = props => {
  const {
    className,
    src,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style = defaultStyles,
    wrapperWidth,
    wrapperHeight,
    ar,
    alt,
  } = props

  const shimmerUrl = `data:image/svg+xml;base64,${toBase64(shimmer(wrapperWidth, wrapperHeight))}`

  const normalizedImageProps = normalizeImageProps(props)

  return (
    <div
      className={classNames(cls.wrapper, {}, [className])}
      style={{ maxWidth: wrapperWidth, height: wrapperHeight, aspectRatio: ar }}
    >
      <Image
        {...normalizedImageProps}
        src={src}
        width={wrapperWidth}
        alt={alt}
        sizes={sizes}
        style={style}
        // TODO: implement shimmer animation effect
        placeholder="blur"
      />
    </div>
  )
}
