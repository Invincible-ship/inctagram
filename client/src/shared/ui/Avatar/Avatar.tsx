'use client'

import { classNames } from '@/shared/lib/classNames/classNames'
import { MyImage } from '@/shared/ui/MyImage/MyImage'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { CSSProperties, FC, useMemo } from 'react'
import cls from './Avatar.module.scss'
import { HStack } from '@/shared/ui/Stack'
import DefaultAvatar from '@/shared/assets/icons/person.svg'

export enum AvatarSize {
  SMALL = 45,
  MEDIUM = 72,
  LARGE = 192,
}

type AvatarProps = {
  className?: string
  src?: string
  size?: AvatarSize
  alt?: string
}

export const Avatar: FC<AvatarProps> = ({
  src,
  className,
  size = AvatarSize.SMALL,
  alt = 'avatar',
}) => {
  const styles: CSSProperties = {
    objectFit: 'contain',
  }

  const sizes = useMemo(
    () =>
      size == AvatarSize.LARGE
        ? '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, (max-width: 1920px) 10vw'
        : '(max-width: 768px) 25vw, (max-width: 1200px) 15vw, (max-width: 1920px) 5vw',
    [size],
  )

  const fallback = <Skeleton width={size} height={size} border="50%" />
  const errorFallback = (
    <HStack
      align="center"
      justify="center"
      className={cls.defaultAvatarWrapper}
      style={{
        width: size,
        height: size,
      }}
    >
      <DefaultAvatar className={cls.defaultAvatar} width={size} height={size} viewBox="0 0 24 24" />
    </HStack>
  )

  if (!src) return errorFallback

  return (
    <MyImage
      className={classNames(cls.Avatar, {}, [className])}
      // @ts-ignore
      src={src}
      alt={alt}
      sizes={sizes}
      width={size}
      height={size}
      style={styles}
      fallback={fallback}
      errorFallback={errorFallback}
    />
  )
}
