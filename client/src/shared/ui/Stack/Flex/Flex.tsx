import { DetailedHTMLProps, HTMLAttributes, ReactNode, forwardRef } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Flex.module.scss'

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'stretch'
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch'
export type FlexDirection = 'row' | 'column'
export type FlexWrap = 'nowrap' | 'wrap'
export type FlexGap = '4' | '8' | '12' | '16' | '24' | '36' | '48'

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
  stretch: cls.justifyStretch,
}

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
  stretch: cls.alignStretch,
}

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
}

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  12: cls.gap12,
  16: cls.gap16,
  24: cls.gap24,
  36: cls.gap36,
  48: cls.gap48,
}

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface FlexProps extends DivProps {
  className?: string
  children: ReactNode
  justify?: FlexJustify
  align?: FlexAlign
  direction?: FlexDirection
  wrap?: FlexWrap
  gap?: FlexGap
  max?: boolean
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    wrap = 'nowrap',
    gap,
    max,
    ...otherProps
  } = props

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    cls[wrap],
    gap && gapClasses[gap],
  ]

  const mods: Mods = {
    [cls.max]: max && direction == 'row',
    [cls.maxWidth]: max && direction == 'column',
  }

  return (
    <div ref={ref} className={classNames(cls.Flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  )
})

Flex.displayName = 'Flex'
