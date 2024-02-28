import { CSSProperties, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Skeleton.module.scss'

interface SkeletonProps {
  className?: string
  height?: string | number
  width?: string | number
  border?: string
  style?: CSSProperties
}

export const Skeleton = memo((props: SkeletonProps) => {
  const { className, height, width, border, style } = props

  const withinStyles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  }

  const styles = style ? { ...withinStyles, ...style } : withinStyles

  return <div className={classNames(cls.Skeleton, {}, [className])} style={styles} />
})

Skeleton.displayName = 'Skeleton'
