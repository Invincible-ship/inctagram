import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { CSSProperties, FC } from 'react'
import cls from './MyImage.module.scss'
import { toBase64 } from '@/shared/utils/toBase64'
import { shimmer } from '@/shared/ui/MyImage/utils'
import { classNames } from '@/shared/lib/classNames/classNames'

const defaultStyles: CSSProperties = {
  objectFit: 'cover',
}

type MyImageProps = {
  className?: string
  wWidth?: number
  wHeight?: number
  ar?: string
} & ImageProps

export const MyImage: FC<MyImageProps> = props => {
  const {
    className,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style = defaultStyles,
    wWidth,
    wHeight,
    ar = '16/9',
    alt,
    placeholder,
  } = props

  const defaultPlaceholder = `data:image/svg+xml;base64,${toBase64(shimmer(wWidth, wHeight))}`

  return (
    <div
      className={classNames(cls.wrapper, {}, [className])}
      style={{ maxWidth: wWidth, aspectRatio: ar }}
    >
      <Image
        {...props}
        alt={alt}
        fill
        sizes={sizes}
        style={style}
        placeholder={placeholder || defaultPlaceholder}
      />
    </div>
  )
}
